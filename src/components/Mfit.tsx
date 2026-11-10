import { copy } from '../site.config'
import { Picture } from './Picture'
import { ChartIcon, ChatIcon, DumbbellIcon, PlayIcon, VideoIcon } from './icons'

const featureIcons = [VideoIcon, DumbbellIcon, ChartIcon, ChatIcon]

const workout = [
  { name: 'Supino reto com halteres', sets: '4 × 8–10', load: '28 kg' },
  { name: 'Crucifixo inclinado', sets: '3 × 12', load: '14 kg' },
  { name: 'Tríceps na polia', sets: '3 × 12', load: '25 kg' },
]

/** Tela ilustrativa (não é captura oficial do aplicativo). */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[17.5rem] md:w-[19rem]" aria-hidden="true">
      <div className="absolute -inset-10 -z-10 rounded-full bg-blue/25 blur-3xl" />
      <div className="rounded-[2.75rem] border border-white/15 bg-[#0d0d0d] p-2.5 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.9)]">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-black">
          <div className="absolute top-2.5 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-[#0d0d0d]" />

          <div className="px-5 pt-12 pb-6">
            <div className="flex items-center justify-between text-[0.65rem] text-white/50">
              <span>Semana 6</span>
              <span>Treino A</span>
            </div>
            <p className="font-display mt-1 text-lg leading-tight font-semibold uppercase">Peito e tríceps</p>

            <div className="relative mt-4 overflow-hidden rounded-2xl">
              <Picture name="metodo" sizes="280px" alt="" imgClassName="aspect-video w-full object-cover object-[50%_30%]" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                  <PlayIcon className="ml-0.5 h-4 w-4" />
                </span>
              </span>
            </div>

            <ul className="mt-4 space-y-2">
              {workout.map((ex, i) => (
                <li key={ex.name} className={`rounded-xl border p-3 ${i === 0 ? 'border-blue/60 bg-blue/10' : 'border-white/10 bg-white/[0.03]'}`}>
                  <p className="text-[0.78rem] leading-tight font-medium">{ex.name}</p>
                  <p className="mt-1 flex justify-between text-[0.68rem] text-white/55">
                    <span>{ex.sets}</span>
                    <span className="text-blue-soft">{ex.load}</span>
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <div className="flex justify-between text-[0.65rem] text-white/50">
                <span>Frequência do mês</span>
                <span>14/16</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[87%] rounded-full bg-blue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Mfit() {
  const { mfit } = copy

  return (
    <section id="mfit" aria-labelledby="mfit-title" className="relative isolate overflow-hidden bg-black py-20 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-2">
          <p className="eyebrow" data-reveal>
            {mfit.eyebrow}
          </p>
          <h2 id="mfit-title" className="h-display mt-4 text-[clamp(1.75rem,8vw,3.5rem)] break-words" data-reveal>
            {mfit.title}
          </h2>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-mute" data-reveal>
            {mfit.text}
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2" data-stagger>
            {mfit.features.map((f, i) => {
              const Icon = featureIcons[i]
              return (
                <li key={f.title} className="rounded-2xl border border-line bg-graphite/60 p-5">
                  <Icon className="h-6 w-6 text-blue-soft" />
                  <h3 className="font-display mt-4 text-base font-semibold uppercase">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mute">{f.text}</p>
                </li>
              )
            })}
          </ul>

          <p className="mt-8 text-xs leading-relaxed text-white/60">{mfit.disclaimer}</p>
        </div>

        <div className="lg:order-1" data-reveal>
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}

