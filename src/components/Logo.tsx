import { LOGO_PATH, LOGO_VIEWBOX } from '../generated/logo'

type LogoProps = {
  className?: string
  withWordmark?: boolean
  /** Esconde a assinatura tipográfica em telas muito estreitas (< 360px), onde não há espaço. */
  hideWordmarkOnTiny?: boolean
}

/** Monograma oficial (vetorizado) + assinatura tipográfica opcional. */
export function Logo({ className = '', withWordmark = true, hideWordmarkOnTiny = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox={LOGO_VIEWBOX} className="h-8 w-auto shrink-0" aria-hidden="true" focusable="false">
        <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
      </svg>
      {withWordmark && (
        <span
          className={`font-display text-[0.8rem] leading-none font-semibold tracking-[0.18em] whitespace-nowrap uppercase ${
            hideWordmarkOnTiny ? 'max-[359px]:hidden' : ''
          }`}
        >
          João Castro <span className="text-blue-soft">Fit</span>
        </span>
      )}
    </span>
  )
}
