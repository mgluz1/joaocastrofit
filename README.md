# joaocastrofit
site para o Joao Castro Fit

## Planilhas de treino (aba /planilhas/)

A loja é controlada por `SHOP_ENABLED` em `src/shop.config.ts` (hoje **ligada**, junto com `SITE_MODE = 'comercial'`). Com ela desligada a
página não é gerada (sem rota, sem item no menu, sem entrada no sitemap). Vender planilha de treino é prescrição de exercício:
manter atenção ao registro profissional (CREF) e à revisão jurídica. O build falha se a loja for ligada fora do modo comercial.

- Catálogo, textos e FAQ: `src/shop.config.ts` (cada produto tem `available` e `price`; sem valor, o card mostra "Valor pelo WhatsApp").
- PDF de um guia: `npm run guia -- guias/<guia>.json --nome "Nome da aluna"` (veja `guias/exemplo.json`). Precisa de
  Playwright (`npm i --no-save playwright && npx playwright install chromium`). O conteúdo real dos guias
  (`guias/*.json`, exceto `exemplo.json`) e os PDFs (`out/`) **não vão para o git**: o repositório é público e o conteúdo é o produto.
