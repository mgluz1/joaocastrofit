import { useEffect, useState } from 'react'
import { copy, links } from '../site.config'
import { Logo } from './Logo'

const nav = [
  { href: '#metodo', label: 'Método' },
  { href: '#mfit', label: 'MFIT' },
  { href: '#sobre', label: 'Sobre' },
]

export function Header() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid ? 'border-line bg-black/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#topo" aria-label="João Castro Fit — início" className="text-white">
          <Logo />
        </a>

        <nav aria-label="Principal" className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-display text-[0.8rem] font-medium tracking-[0.08em] uppercase text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={links.whatsapp} target="_blank" rel="noopener" className="btn btn-light min-h-10 px-5 text-[0.75rem] md:min-h-12 md:px-7">
            {copy.cta.header}
          </a>
        </nav>
      </div>
    </header>
  )
}

