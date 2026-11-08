import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import type { ImageEntry } from '../generated/images'
import { ResultPicture } from './ResultPicture'

type Props = {
  before: ImageEntry
  after: ImageEntry
  beforeAlt: string
  afterAlt: string
  label: string
  aspectRatio?: string
  /** `object-position` das fotos (ex.: '50% 20%'), para não cortar cabeça/tronco no recorte. */
  position?: string
}

const SIZES = '(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 100vw'
const clamp = (n: number) => Math.min(100, Math.max(0, n))

/** Converte uma proporção CSS ("3 / 5" ou "0.6") em número; undefined se não for reconhecida. */
function parseRatio(value?: string) {
  if (!value) return undefined
  const [a, b = 1] = value.split('/').map((part) => parseFloat(part))
  return a > 0 && b > 0 ? a / b : undefined
}

/**
 * Comparador antes/depois. Arrastar (mouse/toque) ou usar as setas do teclado.
 * Esquerda = antes, direita = depois. A rolagem vertical continua livre no celular (touch-action: pan-y).
 */
export function BeforeAfterSlider({ before, after, beforeAlt, afterAlt, label, aspectRatio, position }: Props) {
  const [pos, setPos] = useState(50)
  const boxRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const hint = useRef<{ kill: () => void } | null>(null)
  const ratio = parseRatio(aspectRatio) ?? before.width / before.height

  const stopHint = () => {
    hint.current?.kill()
    hint.current = null
  }

  const moveTo = (clientX: number) => {
    const box = boxRef.current
    if (!box) return
    const rect = box.getBoundingClientRect()
    setPos(clamp(((clientX - rect.left) / rect.width) * 100))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    stopHint()
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    moveTo(e.clientX)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(e.clientX)
  }
  const endDrag = () => {
    dragging.current = false
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    stopHint()
    if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
  }

  // Dica sutil (GSAP, carregado sob demanda): ao entrar na tela o divisor passeia levemente.
  useEffect(() => {
    const box = boxRef.current
    if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        void import('gsap').then(({ gsap }) => {
          if (cancelled || dragging.current) return
          const state = { v: 50 }
          const tl = gsap.timeline({ delay: 0.4 })
          const step = (to: number, duration: number) =>
            tl.to(state, { v: to, duration, ease: 'power2.inOut', onUpdate: () => setPos(state.v) })
          step(34, 0.7)
          step(64, 1)
          step(50, 0.7)
          hint.current = tl
        })
      },
      { threshold: 0.6 },
    )
    observer.observe(box)

    return () => {
      cancelled = true
      observer.disconnect()
      stopHint()
    }
  }, [])

  const objectPosition = position ? { objectPosition: position } : undefined

  return (
    <div
      ref={boxRef}
      role="group"
      aria-label={label}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ aspectRatio: aspectRatio ?? `${before.width} / ${before.height}`, '--ar': ratio } as CSSProperties}
      className="relative mx-auto w-[min(100%,calc(62svh*var(--ar)))] cursor-ew-resize sm:w-full touch-pan-y overflow-hidden rounded-3xl border border-line bg-graphite select-none has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-blue-soft"
    >
      {/* Depois (camada de baixo, sempre inteira) */}
      <ResultPicture image={after} alt={afterAlt} sizes={SIZES} imgClassName="absolute inset-0 h-full w-full object-cover" style={objectPosition} />

      {/* Antes (camada de cima, revelada da esquerda até o divisor) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ResultPicture image={before} alt={beforeAlt} sizes={SIZES} imgClassName="absolute inset-0 h-full w-full object-cover" style={objectPosition} />
      </div>

      <span
        aria-hidden="true"
        className={`font-display pointer-events-none absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm transition-opacity duration-300 ${
          pos > 22 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Antes
      </span>
      <span
        aria-hidden="true"
        className={`font-display pointer-events-none absolute top-4 right-4 rounded-full bg-blue px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-white uppercase transition-opacity duration-300 ${
          pos < 78 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Depois
      </span>

      {/* Controle acessível por teclado/leitor de tela; o arraste usa os eventos de ponteiro acima */}
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        onKeyDown={onKeyDown}
        aria-label={`${label}: posição do divisor entre antes e depois`}
        aria-valuetext={`${Math.round(pos)}% antes, ${100 - Math.round(pos)}% depois`}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />

      {/* Divisor + alça */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-black/75 text-white shadow-[0_0_18px_rgba(30,91,255,0.55)] backdrop-blur-sm">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  )
}
