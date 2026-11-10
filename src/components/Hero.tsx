import type { CSSProperties } from 'react'
import { resultsPage } from '../results.config'
import { copy, links } from '../site.config'
import { Picture } from './Picture'
import { ArrowDownIcon, ArrowIcon, WhatsAppIcon } from './icons'

export const HERO_SIZES = '(min-width: 1024px) 52vw, (min-width: 768px) 70vw, 100vw'

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

export function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="relative isolate flex min-h-[560px] h-svh flex-col overflow-hidden bg-black">
      {/* Foto central: tela cheia no celular; centro-direita com bordas esfumadas no desktop */}
      <div
        className="absolute inset-0 -z-10 md:inset-y-0 md:right-0 md:left-auto md:w-[70%] lg:right-[6%] lg:w-[52%] md:[mask-image:linear-gradient(to_right,transparent,#000_30%,#000_78%,transparent)]"
      >
        <Picture
          name="principal"
          priority
          sizes={HERO_SIZES}
          alt="João Castro na academia, segurando halteres"
          className="block h-full w-full"
          imgClassName="hero-zoom h-full w-full object-cover object-[50%_18%]"
        />
      </div>

      {/* Degradês para legibilidade (topo p/ header, base p/ texto) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,#000_0%,rgb(0_0_0/0.88)_28%,rgb(0_0_0/0.25)_58%,rgb(0_0_0/0.55)_100%)] md:bg-[linear-gradient(to_top,#000_0%,rgb(0_0_0/0.6)_30%,transparent_60%,rgb(0_0_0/0.5)_100%)]"
      />

      <div className="container-x relative mt-auto pb-[max(2.25rem,calc(env(safe-area-inset-bottom)+1.5rem))] md:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="eyebrow fade-up" style={delay(0.1)}>
              {copy.hero.eyebrow}
            </p>

            <h1 id="hero-title" className="h-display mt-4 text-[clamp(2.6rem,11vw,4.75rem)] md:max-w-[13ch]">
              {copy.hero.title.map((line, i) => (
                <span key={line} className="line-mask">
                  <span style={delay(0.15 + i * 0.12)}>{line}</span>
                </span>
              ))}
            </h1>

            <p className="fade-up mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/80 md:text-xl" style={delay(0.45)}>
              {copy.hero.subtitle}
            </p>

            <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={delay(0.6)}>
              <a href={links.whatsapp} target="_blank" rel="noopener" className="btn btn-light w-full sm:w-auto">
                <WhatsAppIcon />
                {copy.cta.primary}
              </a>
              <a href="#metodo" className="btn btn-ghost w-full sm:w-auto">
                Conheça o método
                <ArrowDownIcon className="h-4 w-4" />
              </a>
            </div>
            <a
              href={resultsPage.path}
              className="fade-up font-display mt-3 inline-flex min-h-11 items-center gap-2 [@media(max-height:620px)]:hidden text-[0.8125rem] font-semibold tracking-[0.08em] text-white/80 uppercase transition-colors hover:text-white"
              style={delay(0.7)}
            >
              Ver resultados de antes e depois
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>

          <p className="fade-up hidden text-base leading-relaxed text-white/75 lg:block" style={delay(0.8)}>
            {copy.hero.aside}
          </p>
        </div>
      </div>
    </section>
  )
}

