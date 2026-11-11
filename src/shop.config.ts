import { SITE_MODE } from './site.config'

/**
 * Loja de planilhas de treino (aba /planilhas/).
 *
 * Ligada em 10/11/2026 por decisão do dono do site. Vender planilha de treino é prescrição de exercício:
 * atenção ao registro profissional (CREF) e à revisão jurídica. Exige SITE_MODE = 'comercial' (src/site.config.ts).
 * Com a flag desligada a página não é gerada no build: sem rota, sem item no menu e sem entrada no sitemap.
 */
export const SHOP_ENABLED = true as boolean

if (SHOP_ENABLED && SITE_MODE !== 'comercial') {
  throw new Error("SHOP_ENABLED só pode ser ligada com SITE_MODE = 'comercial' (src/site.config.ts).")
}

export type Product = {
  /** Âncora do card (/planilhas/#iniciante-feminino). */
  id: string
  name: string
  level: 'Iniciante' | 'Intermediário' | 'Foco'
  audience: string
  summary: string
  highlights: readonly string[]
  /** Valor em reais. Sem valor definido, o card mostra "Valor pelo WhatsApp". */
  price?: number
  /** false = card "Em breve", sem botão de compra (conteúdo ainda não pronto). */
  available: boolean
}

export const shopPage = {
  path: '/planilhas/',
  eyebrow: 'Planilhas de treino',
  title: 'Planilhas de treino',
  subtitle: 'Guias em PDF com a sequência de exercícios de cada dia, pensados para o seu nível. Escolha a sua e peça pelo WhatsApp.',
  back: 'Voltar ao início',
  cta: 'Comprar no WhatsApp',
  soon: 'Em breve',
  noPrice: 'Valor pelo WhatsApp',
  disclaimer:
    'Material informativo. Antes de começar qualquer programa de exercícios, procure avaliação médica. Evite treinar com dores articulares ou desconfortos anormais.',
} as const

/** Ordem do catálogo. `available: false` mostra o card como "Em breve", sem botão de compra (hoje todos estão disponíveis). */
export const products: readonly Product[] = [
  {
    id: 'iniciante-masculino',
    name: 'Iniciante masculino',
    level: 'Iniciante',
    audience: 'Homens que estão começando na musculação',
    summary: 'Guia de treinos em PDF com orientações de execução e a sequência de exercícios de cada dia.',
    highlights: ['Orientações para o treino', 'Sequência de exercícios por dia', 'Entrega em PDF pelo WhatsApp'],
    available: true,
  },
  {
    id: 'iniciante-feminino',
    name: 'Iniciante feminino',
    level: 'Iniciante',
    audience: 'Mulheres que estão começando na musculação',
    summary: 'Dois programas de cinco dias, com orientações de execução e a sequência de exercícios de cada dia.',
    highlights: ['2 programas de 5 dias', 'Séries e repetições definidas', 'Cardio de 20 min em todos os dias', '8 orientações para o treino'],
    available: true,
  },
  {
    id: 'intermediario-masculino',
    name: 'Intermediário masculino',
    level: 'Intermediário',
    audience: 'Homens que já treinam com regularidade',
    summary: 'Guia de treinos em PDF para quem já tem base, com a sequência de exercícios de cada dia.',
    highlights: ['Orientações para o treino', 'Sequência de exercícios por dia', 'Entrega em PDF pelo WhatsApp'],
    available: true,
  },
  {
    id: 'intermediario-feminino',
    name: 'Intermediário feminino',
    level: 'Intermediário',
    audience: 'Mulheres que já treinam com regularidade',
    summary: 'Guia de treinos em PDF para quem já tem base, com a sequência de exercícios de cada dia.',
    highlights: ['Orientações para o treino', 'Sequência de exercícios por dia', 'Entrega em PDF pelo WhatsApp'],
    available: true,
  },
  {
    id: 'foco-gluteos',
    name: 'Focado em glúteos',
    level: 'Foco',
    audience: 'Para quem quer priorizar glúteos e pernas',
    summary: 'Guia de treinos em PDF com ênfase em glúteos, com a sequência de exercícios de cada dia.',
    highlights: ['Ênfase em glúteos e pernas', 'Sequência de exercícios por dia', 'Entrega em PDF pelo WhatsApp'],
    available: true,
  },
]

export const shopSteps = [
  { title: 'Escolha a planilha', text: 'Veja o nível e o perfil de cada guia e escolha o seu.' },
  { title: 'Chame no WhatsApp', text: 'O botão do card já abre a conversa com o pedido pronto.' },
  { title: 'Combine o pagamento', text: 'O João confirma o valor e a forma de pagamento com você.' },
  { title: 'Receba o PDF', text: 'O guia chega em PDF, direto no seu WhatsApp.' },
] as const

export const shopFaq = [
  {
    q: 'Como recebo a planilha?',
    a: 'Em PDF, pelo WhatsApp, depois de combinar o pagamento com o João.',
  },
  {
    q: 'Como sei qual escolher?',
    a: 'Cada guia indica o nível (iniciante ou intermediário) e o perfil. Se tiver dúvida, chame o João no WhatsApp antes de comprar.',
  },
  {
    q: 'Posso treinar com alguma condição de saúde?',
    a: 'Antes de começar qualquer programa de exercícios, procure avaliação médica, principalmente se tiver dores, lesões ou doenças. Evite treinar com dores articulares ou desconfortos anormais.',
  },
] as const

export const formatPrice = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
