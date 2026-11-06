// Vetoriza a logo oficial (logo.jpeg) e gera favicons, ícones e a imagem Open Graph.
// Uso: node scripts/build-logo.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'
import potrace from 'potrace'
import { optimize } from 'svgo'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'assets-src')
const PUBLIC = path.join(root, 'public')
const GEN = path.join(root, 'src', 'generated')

await mkdir(PUBLIC, { recursive: true })
await mkdir(GEN, { recursive: true })

// 1. Recorta a borda preta e binariza (a logo é branca sobre preto).
const trimmed = await sharp(path.join(SRC, 'logo.jpeg'))
  .grayscale()
  .threshold(128)
  .trim({ background: '#000000', threshold: 30 })
  .png()
  .toBuffer({ resolveWithObject: true })

const { width: W, height: H } = trimmed.info

// 2. Vetoriza as áreas claras.
const rawSvg = await new Promise((resolve, reject) => {
  potrace.trace(
    trimmed.data,
    { blackOnWhite: false, threshold: 128, turdSize: 20, optTolerance: 0.4, color: 'currentColor', background: 'transparent' },
    (err, svg) => (err ? reject(err) : resolve(svg)),
  )
})

const pathD = [...rawSvg.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]).join(' ')
if (!pathD) throw new Error('Falha ao vetorizar a logo')

const svgCurrent = optimize(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><path fill="currentColor" fill-rule="evenodd" d="${pathD}"/></svg>`,
  { multipass: true, floatPrecision: 1, plugins: ['preset-default'] },
).data

const optimizedD = svgCurrent.match(/\sd="([^"]+)"/)[1]

// Logo de uso geral (cor via CSS) + módulo TS para inline no React.
await writeFile(path.join(PUBLIC, 'logo.svg'), svgCurrent.replace('currentColor', '#fff'))
await writeFile(
  path.join(GEN, 'logo.ts'),
  `// Gerado por scripts/build-logo.mjs — não editar manualmente.\nexport const LOGO_VIEWBOX = '0 0 ${W} ${H}'\nexport const LOGO_PATH = '${optimizedD}'\n`,
)

// 3. Ícones (logo branca centralizada em fundo preto).
const iconSvg = (size, pad = 0.18) => {
  const inner = size * (1 - pad * 2)
  const scale = Math.min(inner / W, inner / H)
  const tx = (size - W * scale) / 2
  const ty = (size - H * scale) / 2
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="100%" height="100%" fill="#000"/><g transform="translate(${tx} ${ty}) scale(${scale})"><path fill="#fff" fill-rule="evenodd" d="${optimizedD}"/></g></svg>`,
  )
}

// favicon.svg com fundo preto arredondado (legível em abas claras e escuras)
const favScale = Math.min(52 / W, 52 / H)
await writeFile(
  path.join(PUBLIC, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#000"/><g transform="translate(${(64 - W * favScale) / 2} ${(64 - H * favScale) / 2}) scale(${favScale.toFixed(5)})"><path fill="#fff" fill-rule="evenodd" d="${optimizedD}"/></g></svg>`,
)

const png = (size, pad) => sharp(iconSvg(size, pad)).png({ compressionLevel: 9, palette: true }).toBuffer()

await writeFile(path.join(PUBLIC, 'apple-touch-icon.png'), await png(180, 0.16))
await writeFile(path.join(PUBLIC, 'icon-192.png'), await png(192, 0.16))
await writeFile(path.join(PUBLIC, 'icon-512.png'), await png(512, 0.16))
await writeFile(path.join(PUBLIC, 'icon-maskable-512.png'), await png(512, 0.26))

// favicon.ico (container ICO com PNG 32x32 embutido)
const ico32 = await png(32, 0.08)
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)
header.writeUInt8(32, 6)
header.writeUInt8(32, 7)
header.writeUInt8(0, 8)
header.writeUInt8(0, 9)
header.writeUInt16LE(1, 10)
header.writeUInt16LE(32, 12)
header.writeUInt32LE(ico32.length, 14)
header.writeUInt32LE(22, 18)
await writeFile(path.join(PUBLIC, 'favicon.ico'), Buffer.concat([header, ico32]))

// 4. Imagem Open Graph 1200x630
const OG_W = 1200
const OG_H = 630
const photoW = 560
const photo = await sharp(path.join(SRC, 'principal.jpeg'))
  .resize(photoW, OG_H, { fit: 'cover', position: 'north' })
  .grayscale()
  .linear(1.2, -20)
  .toBuffer()

const fade = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${photoW}" height="${OG_H}"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset="0.45" stop-color="#000" stop-opacity="0"/></linearGradient><linearGradient id="b" y1="0" y2="1" x1="0" x2="0"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.85"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#b)"/></svg>`,
)

const logoH = 120
const logoScale = logoH / H
const ogText = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <g transform="translate(80 90) scale(${logoScale})"><path fill="#fff" fill-rule="evenodd" d="${optimizedD}"/></g>
  <text x="80" y="300" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="4" fill="#4D82FF">JOÃO CASTRO FIT</text>
  <text x="80" y="370" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="#fff">TREINO COM MÉTODO.</text>
  <text x="80" y="438" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="#fff">EVOLUÇÃO COM</text>
  <text x="80" y="506" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="#fff">CONSTÂNCIA.</text>
  <rect x="80" y="550" width="64" height="4" fill="#1E5BFF"/>
</svg>`,
)

await sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: '#000' } })
  .composite([
    { input: photo, left: OG_W - photoW, top: 0 },
    { input: fade, left: OG_W - photoW, top: 0 },
    { input: ogText, left: 0, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(PUBLIC, 'og-image.jpg'))

const before = (await readFile(path.join(SRC, 'logo.jpeg'))).length
const after = Buffer.byteLength(svgCurrent)
console.log(`Logo: ${(before / 1024).toFixed(1)} KB (jpeg) → ${(after / 1024).toFixed(1)} KB (svg). ViewBox ${W}x${H}`)

