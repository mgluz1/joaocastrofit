import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Animações discretas de rolagem. Carregadas sob demanda (após o load) — sem JS
 * ou com "reduzir movimento" ativo, todo o conteúdo permanece visível.
 */
export function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.registerPlugin(ScrollTrigger)
  const viewport = window.innerHeight
  const isBelowFold = (el: Element) => el.getBoundingClientRect().top > viewport * 0.9

  // Entrada de elementos individuais
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    if (!isBelowFold(el)) return
    gsap.from(el, {
      y: 28,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  })

  // Entrada em sequência (filhos de um grupo)
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
    if (!isBelowFold(group)) return
    gsap.from(group.children, {
      y: 24,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: { trigger: group, start: 'top 88%', once: true },
    })
  })

  // Linha de progresso das etapas do método
  const line = document.querySelector<HTMLElement>('[data-progress-line]')
  if (line?.parentElement) {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: line.parentElement, start: 'top 65%', end: 'bottom 65%', scrub: 0.4 },
      },
    )
  }

  // Linha do tempo da seção Sobre: preenchimento da linha e revelação dos pontos no scroll
  const timeline = document.querySelector<HTMLElement>('[data-timeline]')
  if (timeline) {
    const dots = timeline.querySelectorAll<HTMLElement>('[data-timeline-dot]')
    const timelineLine = timeline.querySelector<HTMLElement>('[data-timeline-line]')

    if (timelineLine) {
      gsap.fromTo(
        timelineLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 80%',
            end: 'bottom 70%',
            scrub: 0.5,
          },
        },
      )
    }

    dots.forEach((dot, index) => {
      gsap.fromTo(
        dot,
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: index === 0 ? 'top 88%' : 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    })
  }
}
