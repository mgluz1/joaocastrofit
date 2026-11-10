// Gera o PDF de um guia de treinos a partir de um JSON (ver guias/exemplo.json).
//
// Uso:
//   node scripts/pdf/build-guia.mjs guias/feminino-iniciante.json
//   node scripts/pdf/build-guia.mjs guias/feminino-iniciante.json --nome "Maria Souza" --out out/guias
//   node scripts/pdf/build-guia.mjs guias/exemplo.json --foto assets-src/principalcolorida.png
//
// Requer o Chromium via Playwright (não é dependência do site):
//   npm i --no-save playwright && npx playwright install chromium
// e as fontes do projeto (npm ci). O conteúdo dos guias (guias/*.json, exceto exemplo.json) e os PDFs
// gerados (out/) ficam fora do git: são o produto.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

// ——— Argumentos ———
const args = process.argv.slice(2)
const dataFile = args[0]
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback
}
if (!dataFile || dataFile.startsWith('--')) {
  console.error('Uso: node scripts/pdf/build-guia.mjs <guia.json> [--nome "Nome"] [--out pasta] [--foto imagem]')
  process.exit(1)
}
const nome = opt('nome')
const outDir = path.resolve(root, opt('out', 'out/guias'))
const foto = path.resolve(root, opt('foto', 'assets-src/principalcolorida.png'))

const guia = JSON.parse(await readFile(path.resolve(root, dataFile), 'utf8'))

// ——— Helpers ———
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const two = (n) => String(n).padStart(2, '0')
const fileUrl = (p) => pathToFileURL(p).href
const font = (pkg, file) => fileUrl(path.join(root, 'node_modules', pkg, 'files', file))

// ——— Numeração de páginas: 1 capa · 2 sumário · 3 orientações · depois 1 página por dia ———
const programs = guia.programas
let nextPage = 4
const starts = programs.map((p) => {
  const start = nextPage
  nextPage += p.dias.length
  return start
})
const totalPages = nextPage - 1
const footer = (label, n) => `<footer><span>JOÃO CASTRO FIT</span><span>${label} / ${two(n)}</span></footer>`

// ——— Páginas ———
const cover = `
<section class="page cover">
  <p class="brand">JOÃO CASTRO FIT</p>
  <div class="cover-text">
    <h1>${esc(guia.titulo).replace(/ (?=[^ ]*$)/, '<br>')}</h1>
    <p class="sub">${esc(guia.subtitulo)}</p>
    <p class="meta"><strong>${esc(guia.resumo)}</strong><br>${esc(guia.legenda)}</p>
    ${nome ? `<p class="for">Para ${esc(nome)} · ${new Date().toLocaleDateString('pt-BR')}</p>` : ''}
  </div>
</section>`

const toc = `
<section class="page">
  <p class="kicker">GUIA DE TREINOS</p>
  <h2 class="title">Sumário</h2>
  <ul class="toc">
    <li><span>Orientações para o treino</span><b>03</b></li>
    ${programs.map((p, i) => `<li><span>${esc(p.nome)}</span><b>${two(starts[i])}</b></li>`).join('')}
  </ul>
  ${footer('GUIA', 2)}
</section>`

const tips = `
<section class="page">
  <p class="kicker">ANTES DE COMEÇAR</p>
  <h2 class="title">Orientações<br>para o treino</h2>
  <ol class="tips">
    ${guia.orientacoes.map((t, i) => `<li><b>${two(i + 1)}</b><span>${esc(t)}</span></li>`).join('')}
  </ol>
  ${footer('GUIA', 3)}
</section>`

const days = programs
  .flatMap((p, pi) =>
    p.dias.map((d, di) => {
      const n = starts[pi] + di
      return `
<section class="page day">
  <div class="bar"></div>
  <div class="row top"><span>${esc(p.nome).toUpperCase()}</span><span class="acc">SUMÁRIO</span></div>
  <h2 class="daynum">DIA ${two(di + 1)}</h2>
  <p class="daytitle">${esc(d.titulo)}</p>
  <div class="row list-head"><span>SEQUÊNCIA DE EXERCÍCIOS</span><span class="acc">${p.series ? esc(p.series.toUpperCase()) : ''}</span></div>
  <ol class="ex">
    ${d.exercicios.map((e, i) => `<li><b>${two(i + 1)}</b><span class="name">${esc(e.nome)}</span>${e.detalhe ? `<em>${esc(e.detalhe)}</em>` : ''}</li>`).join('')}
  </ol>
  ${footer('TREINO', n)}
</section>`
    }),
  )
  .join('')

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>${esc(guia.titulo)} — ${esc(guia.subtitulo)}</title>
<style>
@font-face{font-family:'Archivo';src:url('${font('@fontsource-variable/archivo', 'archivo-latin-wght-normal.woff2')}');font-weight:100 900}
@font-face{font-family:'Inter';src:url('${font('@fontsource-variable/inter', 'inter-latin-wght-normal.woff2')}');font-weight:100 900}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0a0a0a;--ink:#fff;--mute:#a3a3a3;--line:rgba(255,255,255,.12);--acc:#4d82ff;--blue:#1e5bff}
html,body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;background:var(--bg);padding:17mm 16mm;break-after:page}
.page:last-child{break-after:auto}
h1,h2,.brand,.kicker,.sub,.daynum,.daytitle,.ex .name,.toc span{font-family:'Archivo','Inter',sans-serif}
.kicker{font-size:9.5pt;font-weight:700;letter-spacing:.14em;color:var(--acc)}
.title{font-size:38pt;font-weight:700;line-height:1.05;margin-top:9mm;letter-spacing:-.01em}
footer{position:absolute;left:16mm;right:16mm;bottom:10mm;padding-top:4mm;border-top:1px solid var(--line);display:flex;justify-content:space-between;font-size:8pt;font-weight:600;color:var(--mute);letter-spacing:.04em}
/* capa */
.cover{padding:0;background:linear-gradient(to top,#000 0%,rgba(0,0,0,.92) 30%,rgba(0,0,0,.25) 62%,rgba(0,0,0,.55) 100%),url('${fileUrl(foto)}') center top/cover no-repeat,#000}
.cover .brand{position:absolute;top:17mm;left:16mm;font-size:10pt;font-weight:700;letter-spacing:.16em}
.cover-text{position:absolute;left:16mm;right:16mm;bottom:22mm}
.cover h1{font-size:54pt;font-weight:700;line-height:.98;letter-spacing:-.02em}
.cover .sub{margin-top:8mm;font-size:15pt;font-weight:700;letter-spacing:.08em;color:var(--acc)}
.cover .meta{margin-top:14mm;font-size:9.5pt;line-height:1.6;color:var(--mute)}
.cover .meta strong{color:#fff;letter-spacing:.06em}
.cover .for{margin-top:6mm;font-size:10pt;color:#fff}
/* sumário */
.toc{list-style:none;margin-top:18mm;border-top:1px solid var(--line)}
.toc li{display:flex;justify-content:space-between;align-items:center;padding:12mm 0;border-bottom:1px solid var(--line)}
.toc span{font-size:17pt;font-weight:700}.toc b{font-size:12pt;color:var(--acc)}
/* orientações */
.tips{list-style:none;margin-top:16mm}
.tips li{display:flex;gap:7mm;padding:6.5mm 0;border-bottom:1px solid var(--line);font-size:11.5pt;line-height:1.5}
.tips li:last-child{border-bottom:0}.tips b{color:var(--acc);font-size:11pt;min-width:9mm}
/* dias */
.day .bar{position:absolute;top:0;left:0;right:0;height:3mm;background:var(--blue)}
.row{display:flex;justify-content:space-between;align-items:baseline;font-size:8.5pt;font-weight:700;letter-spacing:.06em;color:var(--mute)}
.row .acc{color:var(--acc)}
.day .top{margin-top:1mm}
.daynum{font-size:54pt;font-weight:800;color:var(--acc);line-height:1;margin-top:9mm;letter-spacing:-.01em}
.daytitle{font-size:24pt;font-weight:700;margin-top:6mm}
.list-head{margin-top:18mm;padding-bottom:4mm}
.ex{list-style:none;border-top:1px solid var(--line)}
.ex li{display:flex;align-items:center;gap:6mm;padding:0 0 0 0;height:15.5mm;border-bottom:1px solid var(--line)}
.ex b{color:var(--acc);font-size:10pt;min-width:9mm}
.ex .name{font-size:14pt;font-weight:700;flex:1}
.ex em{font-style:normal;font-size:9.5pt;font-weight:700;color:var(--acc);letter-spacing:.03em}
</style></head><body>
${cover}${toc}${tips}${days}
</body></html>`

// ——— Renderização ———
let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('Playwright não encontrado. Instale com: npm i --no-save playwright && npx playwright install chromium')
  process.exit(1)
}

await mkdir(outDir, { recursive: true })
const tmp = path.join(outDir, `_${guia.id}.html`)
await writeFile(tmp, html)

const slug = nome ? `${guia.id}-${nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}` : guia.id
const pdfPath = path.join(outDir, `joao-castro-fit-treino-${slug}.pdf`)

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(fileUrl(tmp), { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.pdf({ path: pdfPath, preferCSSPageSize: true, printBackground: true })
await browser.close()
await rm(tmp, { force: true })

console.log(`${path.relative(root, pdfPath)} (${totalPages} páginas)`)
