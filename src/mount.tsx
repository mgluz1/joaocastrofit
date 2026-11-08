import type { ReactElement } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './styles/index.css'

/** Monta (ou hidrata, se o HTML já veio pré-renderizado) e agenda as animações de rolagem. */
export function mount(app: ReactElement) {
  const root = document.getElementById('root')!

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
}

