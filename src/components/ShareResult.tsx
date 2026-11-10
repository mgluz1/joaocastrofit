import { useState } from 'react'
import { resultsPage } from '../results.config'

type Props = {
  /** Âncora do resultado (ex.: "r06"): o link compartilhado abre a página já neste cartão. */
  id: string
  title: string
}

/** Compartilha o link direto do resultado: folha nativa no celular; copia o link onde não houver. */
export function ShareResult({ id, title }: Props) {
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    const url = `${window.location.origin}${resultsPage.path}#${id}`
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Compartilhamento cancelado ou área de transferência indisponível: nada a fazer.
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="font-display inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[0.75rem] font-semibold tracking-[0.1em] text-white/70 uppercase transition-colors hover:text-white"
      style={{ touchAction: 'manipulation' }}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" />
      </svg>
      <span aria-live="polite">{copied ? 'Link copiado' : 'Compartilhar'}</span>
      <span className="sr-only"> {title}</span>
    </button>
  )
}
