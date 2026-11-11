import { results } from '../generated/results'
import { resultItems, resultsPage } from '../results.config'
import { BeforeAfterSlider } from '../components/BeforeAfterSlider'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ShareResult } from '../components/ShareResult'
import { StickyCta } from '../components/StickyCta'

export function ResultsPage() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-white px-5 py-3 font-semibold text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para o conteúdo
      </a>
      <Header basePath="/" current="results" />
      <main id="conteudo">
        <section id="topo" aria-labelledby="resultados-title" className="relative bg-black pt-32 pb-12 md:pt-44 md:pb-16">
          <div className="container-x">
            <a
              href="/"
              className="font-display inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.12em] text-white/70 uppercase transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5m6-6-6 6 6 6" />
              </svg>
              {resultsPage.back}
            </a>
            <p className="eyebrow mt-10 text-[0.8125rem] lg:text-[0.75rem]" data-reveal>
              {resultsPage.eyebrow}
            </p>
            <h1 id="resultados-title" className="h-display mt-4 text-[clamp(2.4rem,11vw,5.5rem)]" data-reveal>
              {resultsPage.title}
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/80 md:text-lg" data-reveal>
              {resultsPage.subtitle}
            </p>
            <p className="font-display mt-6 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-[0.75rem] font-semibold tracking-[0.14em] text-white/80 uppercase" data-reveal>
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-blue shadow-[0_0_10px_rgba(30,91,255,0.85)]" />
              {resultItems.length} registros de evolução
            </p>
          </div>
        </section>

        <section aria-label="Comparativos de antes e depois" className="bg-coal pt-4 pb-20 md:pb-28">
          <div className="container-x">
            {/* Flex com quebra: 3 por linha no desktop e a última linha fica centralizada (ex.: 3 + 2) */}
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-8 sm:gap-y-10" data-stagger>
              {resultItems.map((item, i) => {
                const label = `Resultado ${String(i + 1).padStart(2, '0')}`
                return (
                  <li key={item.id} id={item.id} className="w-full scroll-mt-24 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
                    {/* Largura máxima opcional: mantém a proporção natural e alinha a grelha (ex.: fotos muito verticais) */}
                    <div className="mx-auto w-full" style={{ maxWidth: item.maxWidth }}>
                      {/* Título acima do comparador: as legendas ficam alinhadas mesmo com proporções diferentes na fileira */}
                      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <div>
                          <h2 className="font-display text-sm font-semibold tracking-[0.14em] uppercase">{label}</h2>
                          {item.title && <p className="mt-1 text-sm text-white/60">{item.title}</p>}
                        </div>
                        {item.caption && <p className="text-sm text-blue-soft">{item.caption}</p>}
                      </div>
                      <BeforeAfterSlider
                        before={results[item.id].before}
                        after={results[item.id].after}
                        beforeAlt={item.beforeAlt}
                        afterAlt={item.afterAlt}
                        label={label}
                        aspectRatio={item.aspectRatio}
                        position={item.position}
                      />
                      <div className="mt-2 flex justify-end">
                        <ShareResult id={item.id} title={`${label}${item.title ? ` — ${item.title}` : ''}`} />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="mt-12 max-w-xl text-sm leading-relaxed text-white/55" data-reveal>
              * {resultsPage.disclaimer}
            </p>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}

