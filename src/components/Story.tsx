import { academic, copy } from '../site.config'
import { Picture } from './Picture'
import { ShieldIcon } from './icons'

const gallery = [
  { name: 'inicio', caption: 'Onde tudo começou', alt: 'João de costas fazendo pose de duplo bíceps, em preto e branco' },
  { name: 'prova', caption: 'Provas de corrida', alt: 'João correndo uma prova de rua com número de peito, em preto e branco' },
  { name: 'rotina', caption: 'Rotina ao ar livre', alt: 'João correndo em uma ciclovia, em preto e branco' },
] as const

export function Story() {
  const { story } = copy

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative bg-coal py-20 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow" data-reveal>
              {story.eyebrow}
            </p>
            <h2 id="sobre-title" className="h-display mt-4 text-[clamp(2rem,8vw,3.5rem)]" data-reveal>
              {story.title}
            </h2>
          </div>
          <p className="text-[1.0625rem] leading-relaxed text-white/80 lg:self-end lg:text-lg" data-reveal>
            {story.intro}
          </p>
        </div>
      </div>

      {/* Galeria: carrossel com scroll-snap no celular, grade no desktop */}
      <div className="container-x">
        <ul
          aria-label="Fotos da trajetória"
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0"
          data-stagger
        >
          {gallery.map((g) => (
            <li key={g.name} className="relative w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl border border-line md:w-auto">
              <Picture name={g.name} alt={g.alt} sizes="(min-width: 768px) 30vw, 78vw" imgClassName="aspect-[4/5] w-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-14 font-display text-sm font-semibold tracking-[0.12em] uppercase">
                {g.caption}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x mt-16 grid gap-12 md:mt-24 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-20">
        {/* Linha do tempo */}
        <ol className="relative border-l border-line pl-7" data-stagger>
          {story.timeline.map((item, i) => (
            <li key={item.label} className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute top-1.5 -left-[calc(1.75rem+5px)] h-[9px] w-[9px] rounded-full ${
                  i === story.timeline.length - 1 ? 'border border-blue-soft bg-black' : 'bg-blue'
                }`}
              />
              <h3 className="font-display text-lg font-semibold uppercase md:text-xl">{item.label}</h3>
              <p className="mt-1.5 max-w-lg leading-relaxed text-mute">{item.text}</p>
            </li>
          ))}
        </ol>

        {/* Transparência de formação e credenciais */}
        <aside aria-labelledby="credenciais-title" className="h-fit rounded-3xl border border-line bg-graphite p-6 md:p-8" data-reveal>
          <ShieldIcon className="h-7 w-7 text-blue-soft" />
          <h3 id="credenciais-title" className="font-display mt-4 text-base font-semibold tracking-[0.12em] uppercase">
            Formação e credenciais
          </h3>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-white/50">Curso</dt>
              <dd className="mt-0.5 text-white">Graduação em {academic.course}</dd>
            </div>
            <div>
              <dt className="text-white/50">Instituição</dt>
              <dd className="mt-0.5 text-white">{academic.institution}</dd>
            </div>
            <div>
              <dt className="text-white/50">Etapa</dt>
              <dd className="mt-0.5 text-white">{academic.stage}</dd>
            </div>
            <div>
              <dt className="text-white/50">Registro profissional</dt>
              <dd className="mt-0.5 text-white">{academic.cref}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}
