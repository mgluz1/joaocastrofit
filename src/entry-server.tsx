import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'
import { images } from './generated/images'
import { HERO_SIZES } from './components/Hero'
import { ResultsPage } from './pages/ResultsPage'
import { ShopPage } from './pages/ShopPage'
import { SHOP_ENABLED } from './shop.config'

/** O pré-render só gera /planilhas/ quando a loja está habilitada. */
export const shopEnabled = SHOP_ENABLED

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

export function renderResults() {
  return renderToString(
    <StrictMode>
      <ResultsPage />
    </StrictMode>,
  )
}

export function renderShop() {
  return renderToString(
    <StrictMode>
      <ShopPage />
    </StrictMode>,
  )
}

/** Preload da imagem LCP (foto do hero) para ser injetado no <head>. */
export function heroPreload() {
  const hero = images.principal
  const srcset = hero.avif.map((s) => `${s.src} ${s.w}w`).join(', ')
  return `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcset}" imagesizes="${HERO_SIZES}" fetchpriority="high" />`
}
