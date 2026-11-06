import { academic, copy, links } from '../site.config'
import { Logo } from './Logo'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './icons'

const social = [
  { href: links.instagram, label: 'Instagram de João Castro Fit', Icon: InstagramIcon },
  { href: links.tiktok, label: 'TikTok de João Castro Fit', Icon: TikTokIcon },
  { href: links.whatsapp, label: 'WhatsApp de João Castro Fit', Icon: WhatsAppIcon },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-black pt-12 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-12">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            Estudante de {academic.course}. {academic.cref}. Conteúdo de caráter informativo, sem prescrição de exercícios.
          </p>
        </div>

        <ul className="flex gap-3">
          {social.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-white/80 transition-colors hover:border-white hover:text-white"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-white/40 md:flex-row md:justify-between">
        <p suppressHydrationWarning>© {new Date().getFullYear()} João Castro Fit. Todos os direitos reservados.</p>
        <p>{copy.privacy}</p>
      </div>

      <div className="container-x mt-6 flex justify-center">
        <a
          href={links.mglabs}
          target="_blank"
          rel="noopener"
          aria-label="Desenvolvido por mglabs"
          className="group inline-flex items-center gap-2 rounded-lg text-xs tracking-[0.02em] text-white/40 transition-colors hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span>desenvolvido por</span>
          <img
            src="/assinatura/logo-mglabs.png"
            alt="mglabs"
            width={563}
            height={160}
            loading="lazy"
            decoding="async"
            className="h-[30px] w-auto rounded-lg bg-white px-2 py-[5px] opacity-80 transition-opacity group-hover:opacity-100"
          />
        </a>
      </div>
    </footer>
  )
}

