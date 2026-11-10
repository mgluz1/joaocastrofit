// Gera public/og-resultados.jpg (1200×630): antes e depois lado a lado do resultado r02 (quadrado, sem terceiros no fundo).
// Usa as versões já otimizadas de public/results. Uso: node scripts/build-og-results.mjs
import { readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public', 'results')
const ID = 'r02'
const files = await readdir(dir)
const pick = (side) => {
  const best = files
    .map((f) => f.match(new RegExp(`^${ID}-${side}-(\\d+)-[0-9a-f]+\\.jpg$`)))
    .filter(Boolean)
    .map((m) => ({ file: m[0], w: Number(m[1]) }))
    .sort((a, b) => b.w - a.w)[0]
  if (!best) throw new Error(`Sem JPG de ${ID} (${side}) em public/results — rode optimize-results antes.`)
  return path.join(dir, best.file)
}

const W = 1200
const H = 630
const half = W / 2
const cover = (file) => sharp(file).resize(half, H, { fit: 'cover', position: 'centre' }).toBuffer()
const [before, after] = await Promise.all([cover(pick('before')), cover(pick('after'))])

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.88"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="${half - 1.5}" width="3" height="${H}" fill="#fff"/>
  <rect x="28" y="28" rx="18" width="124" height="36" fill="#000" fill-opacity="0.7"/>
  <text x="90" y="52" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="3" fill="#fff" text-anchor="middle">ANTES</text>
  <rect x="${W - 28 - 140}" y="28" rx="18" width="140" height="36" fill="#1e5bff"/>
  <text x="${W - 28 - 70}" y="52" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="3" fill="#fff" text-anchor="middle">DEPOIS</text>
  <text x="40" y="${H - 52}" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="46" font-weight="700" letter-spacing="1" fill="#fff">ANTES E DEPOIS</text>
  <text x="40" y="${H - 20}" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="20" letter-spacing="2" fill="#fff" fill-opacity="0.8">JOÃO CASTRO FIT · JOAOCASTRO.FIT</text>
</svg>`)

const out = await sharp({ create: { width: W, height: H, channels: 3, background: '#000' } })
  .composite([{ input: before, left: 0, top: 0 }, { input: after, left: half, top: 0 }, { input: overlay }])
  .jpeg({ quality: 82, mozjpeg: true, progressive: true })
  .toBuffer()
await writeFile(path.join(root, 'public', 'og-resultados.jpg'), out)
console.log(`og-resultados.jpg: ${(out.length / 1024).toFixed(0)} KB`)
