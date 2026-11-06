/**
 * Configuração central de conteúdo e links.
 *
 * MODO
 *  - 'academico': versão atual. João é estudante de Educação Física sem registro no CREF,
 *    portanto NÃO há oferta de consultoria ou prescrição de exercícios. Contato institucional.
 *  - 'comercial': habilitar SOMENTE após o registro profissional e revisão jurídica/regulatória.
 */
export type SiteMode = 'academico' | 'comercial'

export const SITE_MODE = 'academico' as SiteMode

const WHATSAPP_NUMBER = '5562985280332' // 55 (Brasil) + 62 (DDD) + número

const WHATSAPP_MESSAGE: Record<SiteMode, string> = {
  academico: 'Olá, João. Vim pelo seu site.',
  comercial: 'Olá, João. Tenho interesse na sua consultoria.',
}

export const links = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE[SITE_MODE])}`,
  instagram: 'https://www.instagram.com/joaocastrofit',
  tiktok: 'https://www.tiktok.com/@joaocastrofit',
  mglabs: 'https://mglabss.netlify.app/',
} as const

export const site = {
  name: 'João Castro Fit',
  url: 'https://joaocastrofit.netlify.app',
  title: 'João Castro Fit — Treino com método, evolução com constância',
  description:
    'João Castro, estudante de Educação Física. Rotina de treino, corrida e a construção de um método de acompanhamento baseado em ciência e consistência.',
} as const

// Dados acadêmicos — TODO: confirmar com o João.
export const academic = {
  course: 'Educação Física',
  institution: '[Instituição]',
  stage: '[Período / previsão de formatura]',
  city: 'Goiânia — GO',
  cref: 'Ainda sem registro no CREF',
} as const

const isCommercial = SITE_MODE === 'comercial'

export const copy = {
  cta: {
    primary: isCommercial ? 'Quero começar' : 'Fale comigo',
    header: isCommercial ? 'Começar' : 'Contato',
    sticky: isCommercial ? 'Falar no WhatsApp' : 'Fale no WhatsApp',
  },
  hero: {
    eyebrow: isCommercial ? 'Personal trainer · Consultoria online' : 'Estudante de Educação Física',
    title: ['Treino com método.', 'Evolução com constância.'],
    subtitle: 'Ciência, disciplina e consistência aplicadas à rotina de treino — do básico bem feito à evolução que se sustenta.',
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
      'Sou o João Castro. O treino entrou na minha vida como hábito e virou propósito: hoje estudo Educação Física para transformar experiência prática em conhecimento científico.',
    timeline: [
      { label: 'O começo', text: 'Treino em casa e na academia, aprendendo na prática que constância vence intensidade.' },
      { label: 'Corrida e provas', text: 'Musculação e corrida lado a lado — performance, condicionamento e disciplina.' },
      { label: 'Formação', text: 'Graduação em Educação Física para unir prática, ciência e responsabilidade.' },
      { label: 'Próximo passo', text: 'Registro profissional e lançamento do acompanhamento individualizado.' },
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
