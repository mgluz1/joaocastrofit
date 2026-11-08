import { copy } from '../site.config'
import { Picture } from './Picture'

export function Method() {
  const { method } = copy

  return (
    <section id="metodo" aria-labelledby="metodo-title" className="relative bg-coal py-20 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        {/* Coluna da imagem (fixa no desktop) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow" data-reveal>
            {method.eyebrow}
          </p>
          <h2 id="metodo-title" className="h-display mt-4 text-[clamp(2rem,8vw,3.5rem)]" data-reveal>
            {method.title}
          </h2>

          <div className="mt-10 overflow-hidden rounded-3xl border border-line" data-reveal>
            <Picture
              name="metodo"
              sizes="(min-width: 1024px) 38vw, 100vw"
              alt="João treinando rosca com halter em uma academia, em preto e branco"
              className="block"
              imgClassName="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        {/* Etapas */}
        <div className="relative">
          <span aria-hidden="true" className="absolute top-8 bottom-24 left-[2.35rem] w-px bg-line md:left-[3.25rem]" />
          <span
            aria-hidden="true"
            data-progress-line
            className="absolute top-8 bottom-24 left-[2.35rem] w-px origin-top bg-blue md:left-[3.25rem]"
          />
          <ol className="relative space-y-4 md:space-y-5">
            {method.steps.map((step, i) => (
              <li key={step.title} data-reveal className="relative flex gap-5 rounded-3xl border border-line bg-graphite/70 p-5 md:gap-7 md:p-7">
                <span className="font-display relative z-10 flex h-[2.2rem] w-[2.2rem] shrink-0 items-center justify-center rounded-full border border-blue/60 bg-black text-[0.8rem] font-semibold text-blue-soft md:h-[3rem] md:w-[3rem] md:text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight uppercase md:text-xl">{step.title}</h3>
                  <p className="mt-2 text-[0.975rem] leading-relaxed text-mute">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Acompanhamento na prática: moldura sutil com glow azul discreto */}
          <figure
            data-reveal
            className="mt-8 overflow-hidden rounded-3xl border border-line shadow-[0_30px_80px_-30px_rgba(30,91,255,0.4)] md:mt-10"
          >
            <Picture
              name="acompanhamento"
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="João de camiseta branca segurando uma barra com anilhas em uma academia, em preto e branco"
              className="block"
              imgClassName="aspect-[3/4] w-full object-cover"
            />
            <figcaption className="font-display border-t border-line px-5 py-4 text-[0.7rem] font-semibold tracking-[0.16em] text-white/70 uppercase md:px-7">
              Rotina de treino na prática
            </figcaption>
          </figure>

          <p className="mt-8 text-sm text-white/55" data-reveal>
            * {method.footnote}
          </p>
        </div>
      </div>
    </section>
  )
}
