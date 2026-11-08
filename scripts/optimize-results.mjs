// Separa as colagens "antes e depois" (assets-src/results) em duas fotos por caso e gera
// versões responsivas (AVIF/WebP/JPG) + LQIP. Sem P&B, vinheta ou ajuste de contraste:
// resultados são mostrados em cores originais, sem tratamento estético.
// Uso: node scripts/optimize-results.mjs
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'assets-src', 'results')
const OUT = path.join(root, 'public', 'results')
const GEN = path.join(root, 'src', 'generated')

const WIDTHS = [480, 768, 900]

/**
 * Cada caso vira duas fotos QUADRADAS (mesma proporção nas duas, requisito do comparador; o tamanho
 * em px pode diferir, o componente usa object-cover).
 * Recortes em px do original, medidos nas emendas das colagens:
 *  - bl01/02/03: empilhadas, emenda em y=800 (bl01: a faixa espelhada acima da emenda é descartada).
 *  - bl04: lado a lado, emenda em x=483; o selo "TEAM João Castro" fica fora do recorte.
 *  - bl05: lado a lado, emenda em x=450; o borrão dos rostos fica fora do recorte (y < 300).
 *  - r05 e r06 são proporção 3:5 (~0,6) e 3:4 naturais, sem recorte agressivo; r06 usa um arquivo por lado
 *    (`before.file` / `after.file`), porque antes e depois vêm de fotos separadas.
 */
const CASES = {
  r01: {
    file: 'bl01.png',
    before: { left: 60, top: 0, width: 735, height: 735 },
    after: { left: 40, top: 810, width: 735, height: 735 },
  },
  r02: {
    file: 'bl02.png',
    before: { left: 100, top: 800, width: 800, height: 800 },
    after: { left: 180, top: 260, width: 520, height: 520 },
  },
  r03: {
    file: 'bl03.png',
    before: { left: 50, top: 0, width: 800, height: 800 },
    after: { left: 50, top: 800, width: 800, height: 800 },
  },
  r04: {
    file: 'resultado04corrigir.png',
    before: { left: 0, top: 0, width: 487, height: 1100 },
    after: { left: 488, top: 0, width: 487, height: 1100 },
  },
  r05: {
    file: 'resultado05.png',
    before: { left: 0, top: 0, width: 506, height: 816 },
    after: { left: 506, top: 0, width: 506, height: 816 },
  },
  // Evolução dorsal. Antes: att03 (896×1600) recortado para centralizar a cabeça (x≈560 na foto original)
  // no quadro, em 3:5 (x 156→896, topo→1233). Depois: att04 (1200×1600) com 120px de margem em cada lado
  // (braços preservados), também 3:5.
  r06: {
    before: { file: 'att03.png', left: 156, top: 0, width: 740, height: 1233 },
    after: { file: 'att04.png', left: 120, top: 0, width: 960, height: 1600 },
  },
}

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })
await mkdir(GEN, { recursive: true })

const manifest = {}
let totalIn = 0
let totalOut = 0

for (const [id, cfg] of Object.entries(CASES)) {
  const sides = ['before', 'after']
  const inputs = {}
  for (const side of sides) {
    inputs[side] = await readFile(path.join(SRC, cfg[side].file ?? cfg.file))
    totalIn += inputs[side].length
  }
  const hash = createHash('sha1')
    .update(inputs.before)
    .update(inputs.after)
    .update(JSON.stringify(cfg))
    .digest('hex')
    .slice(0, 8)
  manifest[id] = {}

  for (const side of sides) {
    const crop = cfg[side]
    const master = await sharp(inputs[side]).extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height }).toBuffer()
    const entry = { width: crop.width, height: crop.height, avif: [], webp: [], jpg: [], lqip: '' }

    // Larguras menores que o recorte + a largura nativa (nunca amplia).
    const widths = [...new Set([...WIDTHS.filter((w) => w < crop.width), crop.width])]
    for (const w of widths) {
      const resized = sharp(master).resize({ width: w, withoutEnlargement: true })
      const variants = [
        ['avif', resized.clone().avif({ quality: 55, effort: 6 })],
        ['webp', resized.clone().webp({ quality: 74, effort: 6 })],
        ['jpg', resized.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true })],
      ]
      for (const [ext, pipeline] of variants) {
        const buf = await pipeline.toBuffer()
        const fname = `${id}-${side}-${w}-${hash}.${ext}`
        await writeFile(path.join(OUT, fname), buf)
        entry[ext].push({ w, src: `/results/${fname}` })
        if (ext === 'avif') totalOut += buf.length
      }
    }

    const lqip = await sharp(master).resize(16).blur(1).webp({ quality: 40 }).toBuffer()
    entry.lqip = `data:image/webp;base64,${lqip.toString('base64')}`
    manifest[id][side] = entry
  }
  console.log(`${id}: ${cfg.before.file ?? cfg.file} + ${cfg.after.file ?? cfg.file} → antes ${cfg.before.width}×${cfg.before.height} · depois ${cfg.after.width}×${cfg.after.height}`)
}

await writeFile(
  path.join(GEN, 'results.ts'),
  `// Gerado por scripts/optimize-results.mjs — não editar manualmente.\nimport type { ImageEntry } from './images'\nexport const results = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, { before: ImageEntry; after: ImageEntry }>\nexport type ResultId = keyof typeof results\n`,
)

console.log(`Originais: ${(totalIn / 1024).toFixed(0)} KB · AVIF (todas as larguras, antes+depois): ${(totalOut / 1024).toFixed(0)} KB`)
