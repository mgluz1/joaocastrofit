/**
 * Configuração central de conteúdo e links.
 *
 * MODO
 *  - 'academico': versão atual. NÃO há oferta de consultoria ou prescrição de exercícios. Contato institucional.
 *  - 'comercial': habilitar SOMENTE após revisão jurídica/regulatória.
 */
export type SiteMode = 'academico' | 'comercial'

export const SITE_MODE = 'academico' as SiteMode

const WHATSAPP_NUMBER = '5562985280332' // 55 (Brasil) + 62 (DDD) + número

const WHATSAPP_MESSAGE: Record<SiteMode, string> = {
  academico: 'Olá, João. Vim pelo seu site.',
  comercial: 'Olá, João. Tenho interesse na sua consultoria.',
}

/** Link do WhatsApp com mensagem própria (ex.: pedido de uma planilha específica). */
export const whatsappUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const links = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE[SITE_MODE])}`,
  instagram: 'https://www.instagram.com/joaocastrofit',
  tiktok: 'https://www.tiktok.com/@joaocastrofit',
  mglabs: 'https://mglabss.netlify.app/',
} as const

export const site = {
  name: 'João Castro Fit',
  url: 'https://joaocastro.fit',
  title: 'João Castro Fit — Treino com método, evolução com constância',
  description:
    'João Castro. Rotina de treino, corrida e a construção de um método de acompanhamento baseado em ciência e consistência.',
} as const

const isCommercial = SITE_MODE === 'comercial'

export const copy = {
  cta: {
    primary: isCommercial ? 'Quero começar' : 'Fale comigo',
    header: isCommercial ? 'Começar' : 'Contato',
    sticky: isCommercial ? 'Falar no WhatsApp' : 'Fale no WhatsApp',
  },
  hero: {
    eyebrow: isCommercial ? 'Personal trainer · Consultoria online' : 'Treino e corrida',
    title: ['Treino com método.', 'Evolução com constância.'],
    subtitle: 'Chega de treinar sem direção. Cada escolha importa quando o objetivo é evoluir.',
    aside: 'Sem atalhos. Sem achismo. Só treino bem estruturado, adaptado ao objetivo e à rotina de cada pessoa.',
  },
  method: {
    eyebrow: 'O método',
    title: 'Como será o acompanhamento',
    steps: [
      { title: 'Anamnese e avaliação', text: 'Histórico, rotina, limitações e objetivo. Avaliação física para definir o ponto de partida.' },
      { title: 'Planejamento individual', text: 'Treino estruturado para emagrecimento ou hipertrofia, respeitando nível e disponibilidade.' },
      { title: 'Treino no aplicativo', text: 'Exercícios com vídeo, séries, repetições e cargas organizados no celular.' },
      { title: 'Frequência e evolução', text: 'Registro de presença, cargas e medidas para enxergar o progresso de verdade.' },
      { title: 'Ajustes periódicos', text: 'Revisões regulares do plano conforme a resposta do corpo e a rotina mudam.' },
    ],
    footnote: 'Orientação e prescrição nutricional devem ser realizadas por nutricionista.',
  },
  mfit: {
    eyebrow: 'Tecnologia',
    title: 'Treino organizado no MFIT Personal',
    text: 'O acompanhamento será estruturado no aplicativo MFIT Personal: tudo o que importa para treinar com clareza, no bolso.',
    features: [
      { title: 'Vídeos dos exercícios', text: 'Execução demonstrada para treinar com segurança.' },
      { title: 'Séries e cargas', text: 'Cada treino com volume, descanso e carga definidos.' },
      { title: 'Histórico de evolução', text: 'Registros que mostram o progresso semana a semana.' },
      { title: 'Comunicação direta', text: 'Dúvidas e ajustes centralizados em um só lugar.' },
    ],
    disclaimer: 'MFIT Personal é marca de seus respectivos titulares. Este site não possui integração ou afiliação oficial.',
  },
  story: {
    eyebrow: 'Sobre',
    title: 'Disciplina antes de qualquer resultado',
    intro:
      'Sou o João Castro. O treino entrou na minha vida como hábito e virou propósito: transformo experiência prática em método, com ciência e consistência.',
    timeline: [
      {
        label: 'O Começo',
        text: 'Foi na prática que descobri o valor da disciplina e da constância. Cada treino se tornou parte de uma evolução maior.',
      },
      {
        label: 'Além da Musculação',
        text: 'Da academia às provas de corrida, encontrei novas formas de desafiar meus limites e evoluir.',
      },
    ],
  },
  contact: {
    title: 'Vamos conversar?',
    text: isCommercial
      ? 'Me chama no WhatsApp e conte seu objetivo. Respondo pessoalmente.'
      : 'Parcerias, conteúdo, eventos ou só trocar uma ideia sobre treino — me chama.',
  },
  privacy: 'Este site não utiliza cookies nem coleta dados pessoais.',
} as const
