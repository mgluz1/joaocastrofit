import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import './styles/index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Em produção o HTML vem pré-renderizado; em desenvolvimento renderiza do zero.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

// GSAP só é carregado depois que a página terminou de carregar e o navegador está ocioso.
const startAnimations = () => {
  const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 150))
  idle(() => {
    void import('./lib/animations').then((m) => m.initAnimations())
  })
}

if (document.readyState === 'complete') startAnimations()
else window.addEventListener('load', startAnimations, { once: true })

