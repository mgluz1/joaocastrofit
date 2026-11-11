import { results } from '../generated/results'
import { resultItems, resultsPage } from '../results.config'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import { ArrowIcon } from './icons'

/** Resultado em destaque na home: o primeiro da lista da página /antes-e-depois/. */
const featured = resultItems[0]

/**
 * Vitrine de resultados na home: comparador arrastável + chamada para a página completa.
 * Sem legenda numérica ou promessa: só o assunto da foto (`title`).
 */
export function ResultsTeaser() {
  return (
    <section id="resultados" aria-labelledby="resultados-home-title" className="relative isolate overflow-hidden bg-black py-16 md:py-32">
      <div aria-hidden="true" className="absolute top-1/2 right-0 -z-10 h-[28rem] w-[28rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue/15 blur-3xl" />

      {/* < lg: título → comparador → botão. lg+: texto e botão à esquerda, comparador à direita. */}
      <div className="container-x grid items-center gap-8 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-8">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="eyebrow text-[0.8125rem] lg:text-[0.75rem]" data-reveal>
            {resultsPage.eyebrow}
          </p>
          <h2 id="resultados-home-title" className="h-display mt-4 text-[clamp(2rem,8.6vw,3.5rem)] break-words" data-reveal>
            {resultsPage.title}
          </h2>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-normal text-mute lg:leading-relaxed" data-reveal>
            {resultsPage.subtitle}
          </p>
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1" data-reveal>
          <div className="mx-auto max-w-[22rem]">
            <BeforeAfterSlider
              before={results[featured.id].before}
              after={results[featured.id].after}
              beforeAlt={featured.beforeAlt}
              afterAlt={featured.afterAlt}
              label={featured.title ?? 'Resultado em destaque'}
              aspectRatio={featured.aspectRatio}
              position={featured.position}
            />
            {featured.title && <p className="mt-4 text-center text-sm text-white/60">{featured.title}</p>}
          </div>
        </div>

        <div className="min-w-0 lg:col-start-1 lg:row-start-2 lg:self-start" data-reveal>
          <a href={resultsPage.path} className="btn btn-blue w-full justify-between px-6 sm:w-auto sm:justify-center sm:gap-4">
            Ver todos os resultados
            <ArrowIcon />
          </a>
          <p className="mt-5 max-w-md text-xs leading-relaxed text-white/60">* {resultsPage.disclaimer}</p>
        </div>
      </div>
    </section>
  )
}
