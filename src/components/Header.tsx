import { useEffect, useState } from 'react'
import { copy, links } from '../site.config'
import { resultsPage } from '../results.config'
import { Logo } from './Logo'

type HeaderProps = {
  /** Prefixo das âncoras: '' na home; '/' em páginas internas (aponta de volta para a home). */
  basePath?: string
  /** Página atual, para marcar o item de navegação ativo. */
  current?: 'results'
}

export function Header({ basePath = '', current }: HeaderProps) {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    { href: `${basePath}#metodo`, label: 'Método' },
    { href: `${basePath}#mfit`, label: 'MFIT' },
    { href: `${basePath}#sobre`, label: 'Sobre' },
    { href: resultsPage.path, label: 'Resultados', active: current === 'results' },
  ]

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha o menu do celular com Esc e ao voltar para a tela larga.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid || menuOpen ? 'border-line bg-black/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-3 md:h-20">
        <a
          href={`${basePath}#topo`}
          aria-label="João Castro Fit — início"
          className="flex min-h-11 min-w-0 items-center text-white"
          onClick={() => setMenuOpen(false)}
        >
          <Logo hideWordmarkOnTiny />
        </a>

        <nav aria-label="Principal" className="flex shrink-0 items-center gap-2 md:gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
                  className={`font-display text-[0.8rem] font-medium tracking-[0.08em] uppercase transition-colors hover:text-white ${
                    item.active ? 'text-white' : 'text-white/80'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={links.whatsapp} target="_blank" rel="noopener" className="btn btn-light min-h-11 px-5 text-[0.75rem] md:min-h-12 md:px-7">
            {copy.cta.header}
          </a>
          <button
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white md:hidden"
            style={{ touchAction: 'manipulation' }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </nav>
      </div>

      {/* Menu do celular: acesso direto às seções */}
      <div id="menu-mobile" hidden={!menuOpen} className="border-t border-line bg-black/95 md:hidden">
        <ul className="container-x py-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-display flex min-h-12 items-center text-sm font-medium tracking-[0.12em] uppercase text-white/85 active:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
