import { useEffect, useRef, useState } from 'react'
import { copy } from '../site.config'
import { Picture } from './Picture'

/**
 * Fotos em ordem narrativa. As duas primeiras ilustram "O Começo" e as duas últimas "Além da Musculação" (linha do tempo).
 * `caption`: contexto da foto, não capítulo. `pos`: enquadramento vertical do recorte.
 */
const gallery = [
  { name: 'disciplina', caption: 'Espelho, 1º registro', pos: 'object-[50%_15%]', alt: 'João sem camisa diante de um espelho, em preto e branco, em um quarto com parede azul' },
  { name: 'inicio', caption: 'Treino de costas', pos: 'object-center', alt: 'João de costas fazendo pose de duplo bíceps, em preto e branco' },
  { name: 'prova', caption: 'Prova de rua', pos: 'object-center', alt: 'João correndo uma prova de rua com número de peito, em preto e branco' },
  { name: 'rotina', caption: 'Corrida ao ar livre', pos: 'object-center', alt: 'João correndo em uma ciclovia, em preto e branco' },
] as const

export function Story() {
  const { story } = copy
  const trackRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const [swiped, setSwiped] = useState(false)

  // Indicador de posição (mobile): o cartão mais visível no trilho é o ativo.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const ratios = new Map<Element, number>()
    const cards = Array.from(track.children)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target, e.intersectionRatio))
        let best = 0
        let bestRatio = -1
        cards.forEach((card, i) => {
          const r = ratios.get(card) ?? 0
          if (r >= bestRatio) {
            best = i
            bestRatio = r
          }
        })
        setActive(best)
      },
      { root: track, threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  /** Avança ou volta um cartão (botões do desktop). */
  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: dir * ((card?.offsetWidth ?? track.clientWidth) + gap), behavior: 'smooth' })
  }

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative bg-coal py-20 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-[0.8125rem] lg:text-[0.75rem]" data-reveal>
              {story.eyebrow}
            </p>
            <h2 id="sobre-title" className="h-display mt-4 text-[clamp(1.75rem,8vw,3.5rem)] break-words" data-reveal>
              {story.title}
            </h2>
          </div>
          <p className="text-[1.0625rem] leading-relaxed text-white/80 lg:self-end lg:text-lg" data-reveal>
            {story.intro}
          </p>
        </div>
      </div>

      {/* Narrativa em carrossel horizontal: o começo e as fases seguintes, em ordem. Arraste/rola no celular; botões no desktop. */}
      <div className="container-x">
        <ul
          ref={trackRef}
          onScroll={(e) => {
            if (!swiped && e.currentTarget.scrollLeft > 8) setSwiped(true)
          }}
          aria-label="Fotos da trajetória"
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-16 md:gap-5 md:px-0"
          data-stagger
        >
          {gallery.map((g) => (
            <li
              key={g.name}
              className="relative w-[72%] shrink-0 snap-start overflow-hidden rounded-3xl border border-line shadow-[0_30px_80px_-40px_rgba(30,91,255,0.35)] md:w-[38%]"
            >
              <Picture name={g.name} alt={g.alt} sizes="(min-width: 768px) 38vw, 72vw" imgClassName={`aspect-[4/5] w-full object-cover ${g.pos}`} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-14 font-display text-sm font-semibold tracking-[0.12em] uppercase">
                {g.caption}
              </span>
            </li>
          ))}
        </ul>

        {/* Sinal de deslize (< md): posição atual e dica que some após o primeiro deslize. Decorativo; a lista já tem aria-label. */}
        <div aria-hidden="true" className="mt-4 flex flex-col items-center gap-3 md:hidden">
          <div className="flex gap-2">
            {gallery.map((g, i) => (
              <span key={g.name} className={`h-1 w-6 rounded-full transition-colors duration-300 ${i === active ? 'bg-blue' : 'bg-white/20'}`} />
            ))}
          </div>
          <p className={`flex items-center gap-1.5 text-[0.8125rem] text-white/50 transition-opacity duration-300 ${swiped ? 'opacity-0' : 'opacity-100'}`}>
            Deslize
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </p>
        </div>

        <div className="mt-6 hidden justify-end gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Foto anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-blue hover:text-blue-soft"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Próxima foto"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-blue hover:text-blue-soft"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="container-x mt-12 md:mt-16">
        <div className="max-w-xl">
          <ol className="relative" data-timeline>
            {story.timeline.map((item, index) => {
              const isLast = index === story.timeline.length - 1
              return (
                <li
                  key={item.label}
                  data-timeline-item
                  className="relative flex gap-4 md:gap-5"
                >
                  {/* Coluna da linha e do ponto */}
                  <div className="relative flex flex-col items-center">
                    {/* Ponto azul minimalista com brilho sutil */}
                    <span
                      aria-hidden="true"
                      data-timeline-dot
                      className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full bg-blue shadow-[0_0_10px_rgba(30,91,255,0.85)] ring-4 ring-coal"
                    />

                    {/* Linha vertical que conecta este ponto ao próximo */}
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="relative w-px flex-1 bg-line"
                      >
                        <span
                          data-timeline-line
                          className="absolute inset-0 origin-top bg-gradient-to-b from-blue to-blue-soft"
                        />
                      </div>
                    )}
                  </div>

                  {/* Conteúdo do item */}
                  <div className={isLast ? '' : 'pb-8 md:pb-10'}>
                    <h3 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase md:text-base">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-mute md:text-base">
                      {item.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
          <a href="/antes-e-depois/" className="btn btn-ghost mt-10 w-full sm:w-auto">
            Ver antes e depois
          </a>
        </div>
      </div>
    </section>
  )
}
