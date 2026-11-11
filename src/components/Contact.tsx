import { copy, links } from '../site.config'
import { LOGO_PATH, LOGO_VIEWBOX } from '../generated/logo'
import { Picture } from './Picture'
import { ArrowIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from './icons'

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="relative isolate overflow-hidden bg-black">
      <Picture
        name="pista"
        alt=""
        sizes="100vw"
        className="absolute inset-0 -z-10"
        imgClassName="h-full w-full object-cover object-[45%_70%] opacity-70"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#0a0a0a_0%,rgb(0_0_0/0.55)_35%,rgb(0_0_0/0.75)_70%,#000_100%)]" />

      <div className="container-x flex min-h-[85svh] flex-col justify-center py-24 md:min-h-[42rem] md:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            Contato
          </p>
          <div className="mt-4 flex items-start gap-4 sm:gap-6" data-reveal>
            <div className="shrink-0 pt-1 sm:pt-2">
              <svg
                viewBox={LOGO_VIEWBOX}
                className="h-12 w-auto text-white sm:h-16 md:h-20"
                aria-label="Logo João Castro Fit"
                role="img"
              >
                <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
              </svg>
            </div>
            <h2 id="contato-title" className="h-display text-[clamp(2.25rem,9.5vw,5rem)]">
              {copy.contact.title}
            </h2>
          </div>
          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/80 md:text-lg" data-reveal>
            {copy.contact.text}
          </p>

          <div className="mt-10 flex flex-col gap-3" data-reveal>
            <a href={links.whatsapp} target="_blank" rel="noopener" className="btn btn-blue min-h-14 w-full justify-between px-6 text-[0.9rem] sm:w-auto sm:max-w-sm">
              <span className="flex items-center gap-3">
                <WhatsAppIcon className="h-6 w-6" />
                Conversar no WhatsApp
              </span>
              <ArrowIcon />
            </a>
            <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
              <a href={links.instagram} target="_blank" rel="noopener" className="btn btn-ghost px-4">
                <InstagramIcon />
                Instagram
              </a>
              <a href={links.tiktok} target="_blank" rel="noopener" className="btn btn-ghost px-4">
                <TikTokIcon />
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

