// Pós-build: injeta o HTML renderizado + preloads críticos em cada página de dist/.
import { readFile, writeFile, readdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, renderResults, renderShop, shopEnabled, heroPreload } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const assets = await readdir(path.join(dist, 'assets'))
const fontPreloads = assets
  .filter((f) => /^(archivo|inter)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

const pages = [
  { file: 'index.html', head: `${heroPreload()}\n    ${fontPreloads}`, body: render() },
  { file: path.join('antes-e-depois', 'index.html'), head: fontPreloads, body: renderResults() },
]

// Loja de planilhas: só existe no build com SHOP_ENABLED (src/shop.config.ts).
if (shopEnabled) {
  pages.push({ file: path.join('planilhas', 'index.html'), head: fontPreloads, body: renderShop() })
  const sitemapPath = path.join(dist, 'sitemap.xml')
  const sitemap = await readFile(sitemapPath, 'utf8')
  const entry = '  <url>\n    <loc>https://joaocastro.fit/planilhas/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n'
  if (!sitemap.includes('/planilhas/')) await writeFile(sitemapPath, sitemap.replace('</urlset>', `${entry}</urlset>`))
}

for (const page of pages) {
  const target = path.join(dist, page.file)
  const template = await readFile(target, 'utf8')
  const html = template.replace('<!--head-->', page.head).replace('<!--app-->', page.body)
  await writeFile(target, html)
  console.log(`Pré-render concluído: ${page.file} (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB de HTML).`)
}

await rm(ssrDir, { recursive: true, force: true })
