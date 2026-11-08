// Pós-build: injeta o HTML renderizado + preloads críticos em cada página de dist/.
import { readFile, writeFile, readdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, renderResults, heroPreload } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const assets = await readdir(path.join(dist, 'assets'))
const fontPreloads = assets
  .filter((f) => /^(archivo|inter)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

const pages = [
  { file: 'index.html', head: `${heroPreload()}\n    ${fontPreloads}`, body: render() },
  { file: path.join('antes-e-depois', 'index.html'), head: fontPreloads, body: renderResults() },
]

for (const page of pages) {
  const target = path.join(dist, page.file)
  const template = await readFile(target, 'utf8')
  const html = template.replace('<!--head-->', page.head).replace('<!--app-->', page.body)
  await writeFile(target, html)
  console.log(`Pré-render concluído: ${page.file} (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB de HTML).`)
}

await rm(ssrDir, { recursive: true, force: true })
