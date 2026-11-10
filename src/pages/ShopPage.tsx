import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Picture } from '../components/Picture'
import { StickyCta } from '../components/StickyCta'
import { WhatsAppIcon } from '../components/icons'
import { formatPrice, products, shopFaq, shopPage, shopSteps, type Product } from '../shop.config'
import { whatsappUrl } from '../site.config'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-blue-soft" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 5 5 9-10" />
  </svg>
)

function ProductCard({ product }: { product: Product }) {
  const buy = whatsappUrl(`Olá, João. Quero a planilha ${product.name}.`)

  return (
    <article
      id={product.id}
      aria-labelledby={`${product.id}-title`}
      className="flex h-full scroll-mt-24 flex-col rounded-3xl border border-line bg-graphite/70 p-6 md:p-7"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display rounded-full border border-blue/50 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-blue-soft uppercase">
          {product.level}
        </span>
        {!product.available && (
          <span className="font-display rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-white/80 uppercase">
            {shopPage.soon}
          </span>
        )}
      </div>

      <h2 id={`${product.id}-title`} className="h-display mt-5 text-[1.75rem] break-words md:text-[2rem]">
        {product.name}
      </h2>
      <p className="mt-2 text-sm text-white/60">{product.audience}</p>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute">{product.summary}</p>

      <ul className="mt-5 space-y-2 text-sm text-white/85">
        {product.highlights.map((item) => (
          <li key={item} className="flex gap-2.5">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        {(product.available || product.price != null) && (
          <p className="font-display text-xl font-semibold">{product.price != null ? formatPrice(product.price) : shopPage.noPrice}</p>
        )}
        {product.available ? (
          <a href={buy} target="_blank" rel="noopener" className="btn btn-blue mt-4 w-full">
            <WhatsAppIcon />
            {shopPage.cta}
          </a>
        ) : (
          <span aria-disabled="true" className="btn btn-ghost mt-4 w-full cursor-not-allowed opacity-60">
            {shopPage.soon}
          </span>
        )}
      </div>
    </article>
  )
}

export function ShopPage() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-white px-5 py-3 font-semibold text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para o conteúdo
      </a>
      <Header basePath="/" current="shop" />
      <main id="conteudo">
        <section id="topo" aria-labelledby="planilhas-title" className="relative bg-black pt-32 pb-12 md:pt-44 md:pb-16">
          <div className="container-x">
            <a
              href="/"
              className="font-display inline-flex min-h-11 items-center gap-2 text-[0.75rem] font-medium tracking-[0.12em] text-white/70 uppercase transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5m6-6-6 6 6 6" />
              </svg>
              {shopPage.back}
            </a>
            <p className="eyebrow mt-8 text-[0.8125rem] lg:text-[0.75rem]" data-reveal>
              {shopPage.eyebrow}
            </p>
            <h1 id="planilhas-title" className="h-display mt-4 text-[clamp(2.25rem,11vw,6rem)] break-words" data-reveal>
              {shopPage.title}
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/80 md:text-lg" data-reveal>
              {shopPage.subtitle}
            </p>
            <p
              className="font-display mt-6 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-[0.75rem] font-semibold tracking-[0.14em] text-white/80 uppercase"
              data-reveal
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-blue shadow-[0_0_10px_rgba(30,91,255,0.85)]" />
              {products.length} planilhas · PDF pelo WhatsApp
            </p>
          </div>
        </section>

        <section id="catalogo" aria-label="Catálogo de planilhas" className="bg-coal py-12 md:py-20">
          <div className="container-x">
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {products.map((product) => (
                <li key={product.id} className="min-w-0">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-white/60" data-reveal>
              * {shopPage.disclaimer}
            </p>
          </div>
        </section>

        <section id="previa" aria-labelledby="previa-title" className="bg-black py-16 md:py-28">
          <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div className="min-w-0">
              <p className="eyebrow text-[0.8125rem] lg:text-[0.75rem]" data-reveal>
                Por dentro do guia
              </p>
              <h2 id="previa-title" className="h-display mt-4 text-[clamp(1.75rem,8vw,3.5rem)] break-words" data-reveal>
                Veja como é o material
              </h2>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-normal text-mute lg:leading-relaxed" data-reveal>
                Capa, orientações para o treino e a sequência de exercícios de cada dia, em um PDF organizado para consultar no celular.
              </p>
              <p className="mt-4 text-xs text-white/60" data-reveal>
                Exemplo: guia Feminino Iniciante.
              </p>
            </div>

            <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-3 sm:gap-5" data-reveal>
              <figure className="min-w-0">
                <div className="overflow-hidden rounded-2xl border border-line">
                  <Picture
                    name="planilha-capa"
                    sizes="(min-width: 1024px) 15rem, 45vw"
                    alt="Capa do guia de treinos Feminino Iniciante, com o título Guia de Treinos"
                    className="block"
                    imgClassName="aspect-[827/1170] w-full object-cover"
                  />
                </div>
                <figcaption className="font-display mt-3 text-xs font-semibold tracking-[0.14em] text-white/70 uppercase">Capa</figcaption>
              </figure>
              <figure className="min-w-0">
                <div className="overflow-hidden rounded-2xl border border-line">
                  <Picture
                    name="planilha-treino"
                    sizes="(min-width: 1024px) 15rem, 45vw"
                    alt="Página de um dia de treino com a lista numerada de exercícios e a indicação de séries e repetições"
                    className="block"
                    imgClassName="aspect-[827/1170] w-full object-cover"
                  />
                </div>
                <figcaption className="font-display mt-3 text-xs font-semibold tracking-[0.14em] text-white/70 uppercase">Treino do dia</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="como-funciona" aria-labelledby="como-title" className="bg-coal py-16 md:py-28">
          <div className="container-x">
            <p className="eyebrow text-[0.8125rem] lg:text-[0.75rem]" data-reveal>
              Passo a passo
            </p>
            <h2 id="como-title" className="h-display mt-4 text-[clamp(1.75rem,8vw,3.5rem)] break-words" data-reveal>
              Como funciona
            </h2>
            <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
              {shopSteps.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-line bg-graphite/70 p-5">
                  <span className="font-display flex h-8 w-8 items-center justify-center rounded-full border border-blue/60 bg-black text-[0.8125rem] font-semibold text-blue-soft">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display mt-4 text-base font-semibold tracking-tight uppercase">{step.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-normal text-mute">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="duvidas" aria-labelledby="duvidas-title" className="bg-black py-16 md:py-28">
          <div className="container-x max-w-3xl">
            <h2 id="duvidas-title" className="h-display text-[clamp(1.75rem,8vw,3rem)] break-words" data-reveal>
              Dúvidas frequentes
            </h2>
            <div className="mt-8 divide-y divide-line border-y border-line" data-reveal>
              {shopFaq.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="font-display flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-blue-soft transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="pb-5 text-[0.9375rem] leading-relaxed text-mute">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
