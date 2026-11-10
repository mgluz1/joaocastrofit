# joaocastrofit
site para o Joao Castro Fit

## Planilhas de treino (aba /planilhas/)

A loja fica **desligada**: `SHOP_ENABLED = false` em `src/shop.config.ts`. Com ela desligada a página não é gerada
(sem rota, sem item no menu, sem entrada no sitemap). Só ligar depois do registro profissional (CREF) e da revisão
jurídica, junto com `SITE_MODE = 'comercial'` em `src/site.config.ts` (o build falha se a loja for ligada sem isso).

- Catálogo, textos e FAQ: `src/shop.config.ts` (cada produto tem `available` e `price`; sem valor, o card mostra "Valor pelo WhatsApp").
- PDF de um guia: `npm run guia -- guias/<guia>.json --nome "Nome da aluna"` (veja `guias/exemplo.json`). Precisa de
  Playwright (`npm i --no-save playwright && npx playwright install chromium`). O conteúdo real dos guias
  (`guias/*.json`, exceto `exemplo.json`) e os PDFs (`out/`) **não vão para o git**: o repositório é público e o conteúdo é o produto.
