import { shopPage } from '../shop.config'
import { Picture } from './Picture'
import { ArrowIcon } from './icons'

const levels = ['Iniciante', 'Intermediário', 'Focado em glúteos'] as const

/** Vitrine da loja na home: previews do guia, níveis disponíveis e chamada para a aba /planilhas/. */
export function ShopTeaser() {
  return (
    <section id="planilhas" aria-labelledby="planilhas-home-title" className="relative isolate overflow-hidden bg-coal py-16 md:py-32">
      <div aria-hidden="true" className="absolute top-1/2 left-0 -z-10 h-[26rem] w-[26rem] -translate-x-1/3 -translate-y-1/2 rounded-full bg-blue/15 blur-3xl" />

      {/* < lg: título → previews → botão. lg+: previews à esquerda, texto e botão à direita. */}
      <div className="container-x grid items-center gap-8 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-8">
        <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:self-end">
          <p className="eyebrow text-[0.8125rem] lg:text-[0.75rem]" data-reveal>
            Catálogo
          </p>
          <h2 id="planilhas-home-title" className="h-display mt-4 text-[clamp(1.75rem,8vw,3.5rem)] break-words" data-reveal>
            Planilhas de treino em PDF
          </h2>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-normal text-mute lg:leading-relaxed" data-reveal>
            {shopPage.subtitle}
          </p>
          <ul aria-label="Níveis disponíveis" className="mt-6 flex flex-wrap gap-2" data-reveal>
            {levels.map((level) => (
              <li
                key={level}
                className="font-display rounded-full border border-line px-3.5 py-1.5 text-[0.75rem] font-semibold tracking-[0.08em] text-white/85 uppercase"
              >
                {level}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-white/60" data-reveal>
            Versões masculina e feminina para iniciante e intermediário.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:gap-5 lg:col-start-1 lg:row-span-2 lg:row-start-1" data-reveal>
          <div className="min-w-0 overflow-hidden rounded-2xl border border-line">
            <Picture
              name="planilha-capa"
              sizes="(min-width: 1024px) 14rem, 45vw"
              alt="Capa do guia de treinos Feminino Iniciante"
              className="block"
              imgClassName="aspect-[827/1170] w-full object-cover"
            />
          </div>
          <div className="min-w-0 overflow-hidden rounded-2xl border border-line">
            <Picture
              name="planilha-treino"
              sizes="(min-width: 1024px) 14rem, 45vw"
              alt="Página de um dia de treino com a lista numerada de exercícios"
              className="block"
              imgClassName="aspect-[827/1170] w-full object-cover"
            />
          </div>
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-start-2 lg:self-start" data-reveal>
          <a href={shopPage.path} className="btn btn-blue w-full justify-between px-6 sm:w-auto sm:justify-center sm:gap-4">
            Ver planilhas
            <ArrowIcon />
          </a>
          <p className="mt-5 max-w-md text-xs leading-relaxed text-white/60">* {shopPage.disclaimer}</p>
        </div>
      </div>
    </section>
  )
}
