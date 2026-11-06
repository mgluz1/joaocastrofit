// Pós-build: injeta o HTML renderizado + preloads críticos em dist/index.html.
import { readFile, writeFile, readdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, heroPreload } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const assets = await readdir(path.join(dist, 'assets'))
const fontPreloads = assets
  .filter((f) => /^(archivo|inter)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

const templatePath = path.join(dist, 'index.html')
const template = await readFile(templatePath, 'utf8')
const html = template
  .replace('<!--head-->', `${heroPreload()}\n    ${fontPreloads}`)
  .replace('<!--app-->', render())

await writeFile(templatePath, html)
await rm(ssrDir, { recursive: true, force: true })
console.log(`Pré-render concluído (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB de HTML).`)

