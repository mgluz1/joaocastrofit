import { useEffect, useState } from 'react'
import { copy, links } from '../site.config'
import { InstagramIcon, WhatsAppIcon } from './icons'

/** Barra de contato fixa (somente celular): aparece após o hero e some na seção de contato. */
export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('topo')
    const contact = document.getElementById('contato')
    if (!hero || !contact) return

    const state = { heroVisible: true, contactVisible: false }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) state.heroVisible = e.isIntersecting
          if (e.target === contact) state.contactVisible = e.isIntersecting
        }
        setVisible(!state.heroVisible && !state.contactVisible)
      },
      { rootMargin: '0px 0px -20% 0px' },
    )
    observer.observe(hero)
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black/85 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-500 ease-out-expo md:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex gap-3">
        <a href={links.whatsapp} target="_blank" rel="noopener" tabIndex={visible ? 0 : -1} className="btn btn-blue min-h-12 flex-1">
          <WhatsAppIcon />
          {copy.cta.sticky}
        </a>
        <a
          href={links.instagram}
          target="_blank"
          rel="noopener"
          tabIndex={visible ? 0 : -1}
          aria-label="Instagram de João Castro Fit"
          className="btn btn-ghost min-h-12 w-12 px-0"
        >
          <InstagramIcon />
        </a>
      </div>
    </div>
  )
}

