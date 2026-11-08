// Gera versões responsivas (AVIF/WebP/JPG) + LQIP para as fotos do site (P&B, exceto as com `color: true`).
// Uso: node scripts/optimize-images.mjs
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'assets-src')
const OUT = path.join(root, 'public', 'img')
const GEN = path.join(root, 'src', 'generated')

/**
 * crop: região do original (px). vignette: intensidade 0–1. focus: centro da vinheta (0–1).
 * contrast/brightness: ajuste linear após o P&B. color: mantém as cores originais (sem P&B).
 */
const PHOTOS = {
  principal: { file: 'principalcolorida.png', color: true, widths: [480, 768, 1066], vignette: 0.45, focus: [0.48, 0.38], contrast: 1.05, brightness: -4 },
  metodo: { file: 'ft01.jpeg', crop: { left: 0, top: 80, width: 1066, height: 1333 }, widths: [480, 768, 1066], vignette: 0.55, focus: [0.5, 0.4], contrast: 1.15, brightness: -10 },
  prova: { file: 'ft02.jpeg', crop: { left: 0, top: 120, width: 900, height: 1125 }, widths: [480, 768, 900], vignette: 0.6, focus: [0.48, 0.45], contrast: 1.2, brightness: -12 },
  rotina: { file: 'ft03.jpeg', crop: { left: 0, top: 220, width: 740, height: 925 }, widths: [480, 740], vignette: 0.6, focus: [0.5, 0.45], contrast: 1.2, brightness: -12 },
  pista: { file: 'ft04.jpeg', widths: [480, 768, 1074], vignette: 0.5, focus: [0.42, 0.68], contrast: 1.1, brightness: -30 },
  // corner: escurece um canto para esconder elementos do fundo (quadro na parede).
  inicio: { file: 'ft05.jpeg', crop: { left: 190, top: 210, width: 860, height: 1075 }, widths: [480, 768, 860], vignette: 0.9, focus: [0.5, 0.45], contrast: 1.25, brightness: -18, corner: { x: 0, y: 0, r: 0.3, opacity: 0.85 } },
  // Seção "O Método": acompanhamento na prática (sem recorte; proporção 3:4 original).
  acompanhamento: { file: 'att01.png', widths: [480, 768, 960], vignette: 0.5, focus: [0.5, 0.4], contrast: 1.15, brightness: -8 },
  // Seção "Sobre": foto editorial (sem recorte; proporção original, exibida inteira).
  disciplina: { file: 'att02.png', widths: [480, 575], vignette: 0.5, focus: [0.5, 0.45], contrast: 1.12, brightness: -6 },
}

const cornerSvg = (w, h, { x, y, r, opacity }) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><radialGradient id="c" cx="${x}" cy="${y}" r="${r}"><stop offset="0.55" stop-color="#000" stop-opacity="${opacity}"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#c)"/></svg>`,
  )

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })
await mkdir(GEN, { recursive: true })

const vignetteSvg = (w, h, strength, [fx, fy]) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><radialGradient id="v" cx="${fx}" cy="${fy}" r="0.75"><stop offset="0.35" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${strength}"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#v)"/></svg>`,
  )

const manifest = {}
let totalIn = 0
let totalOut = 0

for (const [name, cfg] of Object.entries(PHOTOS)) {
  const input = await readFile(path.join(SRC, cfg.file))
  totalIn += input.length
  const hash = createHash('sha1').update(input).update(JSON.stringify(cfg)).digest('hex').slice(0, 8)

  let base = sharp(input).rotate()
  if (cfg.crop) base = base.extract(cfg.crop)
  const graded = await (cfg.color ? base : base.grayscale())
    .linear(cfg.contrast, cfg.brightness + 128 * (1 - cfg.contrast))
    .toBuffer({ resolveWithObject: true })

  const { width, height } = graded.info
  const master = await sharp(graded.data)
    .composite([
      { input: vignetteSvg(width, height, cfg.vignette, cfg.focus) },
      ...(cfg.corner ? [{ input: cornerSvg(width, height, cfg.corner) }] : []),
    ])
    .toColourspace(cfg.color ? 'srgb' : 'b-w')
    .png()
    .toBuffer()

  const entry = { width, height, avif: [], webp: [], jpg: [], lqip: '' }

  for (const w of cfg.widths) {
    const resized = sharp(master).resize({ width: Math.min(w, width), withoutEnlargement: true })
    const variants = [
      ['avif', resized.clone().avif({ quality: 50, effort: 6 })],
      ['webp', resized.clone().webp({ quality: 70, effort: 6 })],
      ['jpg', resized.clone().jpeg({ quality: 74, mozjpeg: true, progressive: true })],
    ]
    for (const [ext, pipeline] of variants) {
      const buf = await pipeline.toBuffer()
      const fname = `${name}-${w}-${hash}.${ext}`
      await writeFile(path.join(OUT, fname), buf)
      entry[ext].push({ w, src: `/img/${fname}` })
      if (ext === 'avif') totalOut += buf.length
    }
  }

  const lqip = await sharp(master).resize(16).blur(1).webp({ quality: 40 }).toBuffer()
  entry.lqip = `data:image/webp;base64,${lqip.toString('base64')}`
  manifest[name] = entry
  console.log(`${name}: ${(input.length / 1024).toFixed(0)} KB → ${entry.avif.map((v) => v.w).join('/')}px`)
}

await writeFile(
  path.join(GEN, 'images.ts'),
  `// Gerado por scripts/optimize-images.mjs — não editar manualmente.\nexport type ImageSource = { w: number; src: string }\nexport type ImageEntry = { width: number; height: number; avif: ImageSource[]; webp: ImageSource[]; jpg: ImageSource[]; lqip: string }\nexport const images = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, ImageEntry>\nexport type ImageName = keyof typeof images\n`,
)

console.log(`Originais: ${(totalIn / 1024).toFixed(0)} KB · AVIF (todas as larguras): ${(totalOut / 1024).toFixed(0)} KB`)
