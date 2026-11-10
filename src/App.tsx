import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Method } from './components/Method'
import { Mfit } from './components/Mfit'
import { ResultsTeaser } from './components/ResultsTeaser'
import { ShopTeaser } from './components/ShopTeaser'
import { StickyCta } from './components/StickyCta'
import { Story } from './components/Story'
import { SHOP_ENABLED } from './shop.config'

export function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-white px-5 py-3 font-semibold text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Method />
        <ResultsTeaser />
        {SHOP_ENABLED && <ShopTeaser />}
        <Mfit />
        <Story />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}

