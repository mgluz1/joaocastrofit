import { discountPercent, formatPrice, shopPromo } from '../shop.config'

/** Selo de oferta (rótulo, preço "de" riscado, preço promocional e desconto), com brilho e ponto pulsante. */
export function PromoPill({ className = '' }: { className?: string }) {
  const off = discountPercent(shopPromo.originalPrice, shopPromo.price)

  return (
    <div className={`promo-pill relative inline-flex max-w-full items-center gap-3.5 overflow-hidden rounded-2xl border border-blue/50 bg-blue/10 py-3 pr-3 pl-4 ${className}`}>
      <span aria-hidden="true" className="promo-dot h-2.5 w-2.5 shrink-0 rounded-full bg-blue-soft shadow-[0_0_12px_rgba(77,130,255,0.9)]" />
      <div className="min-w-0">
        <p className="font-display text-xs font-semibold tracking-[0.14em] text-blue-soft uppercase">{shopPromo.label}</p>
        <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2.5">
          <span className="sr-only">Planilhas de </span>
          <s className="text-sm text-white/55">{formatPrice(shopPromo.originalPrice)}</s>
          <span className="sr-only"> por </span>
          <strong className="font-serif text-2xl leading-tight font-medium text-white">{formatPrice(shopPromo.price)}</strong>
        </p>
      </div>
      <span className="promo-badge font-display ml-1 shrink-0 rounded-full bg-blue px-3 py-1.5 text-xs font-semibold tracking-[0.06em] text-white">
        <span className="sr-only">Desconto de </span>
        −{off}%
      </span>
    </div>
  )
}
