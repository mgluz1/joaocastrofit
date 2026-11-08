import type { ResultId } from './generated/results'

/**
 * Conteúdo da página /antes-e-depois.
 * As imagens são geradas por `scripts/optimize-results.mjs` a partir de assets-src/results.
 *
 * `caption`: só preencher com informação verdadeira e comprovável (ex.: período de acompanhamento).
 * Antes de publicar, confirmar autorização de uso de imagem de cada pessoa (LGPD).
 */
export type ResultItem = {
  id: ResultId
  /** Assunto do resultado, exibido abaixo do número (ex.: "Evolução Dorsal / Costas"). */
  title?: string
  caption?: string
  /**
   * Largura máxima do cartão (CSS). Usar em fotos muito verticais (ex.: r04, ~0,44) para que o
   * cartão não fique desproporcionalmente mais alto que os demais, sem cortar a imagem.
   */
  maxWidth?: string
  /** Proporção do cartão (CSS). Padrão: proporção natural da foto "antes". Usar para igualar cards vizinhos na grelha. */
  aspectRatio?: string
  /** `object-position` das fotos (ex.: '50% 20%'), se o recorte cortar cabeça/tronco. Padrão: centro. */
  position?: string
  beforeAlt: string
  afterAlt: string
}

export const resultsPage = {
  eyebrow: 'Resultados',
  title: 'Antes e depois',
  subtitle: 'Registros de evolução construídos com treino, constância e disciplina. Arraste para comparar.',
  disclaimer: 'Resultados individuais: variam conforme rotina, alimentação, genética e dedicação de cada pessoa.',
  back: 'Voltar ao início',
  path: '/antes-e-depois/',
} as const

export const resultItems: readonly ResultItem[] = [
  // Evolução dorsal (antes era o Resultado 06): agora é o primeiro resultado da página.
  {
    id: 'r06',
    title: 'Evolução Dorsal / Costas',
    aspectRatio: '3 / 5',
    beforeAlt: 'Antes: costas de homem sem camisa, em pé diante de uma janela com cortinas claras',
    afterAlt: 'Depois: costas de homem com os braços flexionados em pose de duplo bíceps de costas, dentro de casa',
  },
  // Resultado 01 comentado: não aparece na página (os rótulos renumeram sozinhos).
  // {
  //   id: 'r01',
  //   beforeAlt: 'Antes: tronco de homem com a camiseta levantada, em foto de espelho',
  //   afterAlt: 'Depois: tronco definido durante uma corrida ao ar livre',
  // },
  // Primeira linha: fotos verticais (04 ≈ 0,44 · costas e 05 ≈ 0,6). Segunda linha: quadradas (1:1).
  {
    id: 'r04',
    caption: '3 meses de acompanhamento',
    // Iguala a altura dos cards 05 e 06 (3:5) na mesma fileira da grelha.
    maxWidth: '17.1rem',
    beforeAlt: 'Antes: vista lateral do corpo com short preto',
    afterAlt: 'Depois: vista lateral do corpo com mais definição e tônus muscular',
  },
  {
    id: 'r05',
    caption: '21kg em 1 mês',
    aspectRatio: '3 / 5',
    beforeAlt: 'Antes: homem de perfil sem camisa com bermuda azul e sobrepeso',
    afterAlt: 'Depois: homem de perfil sem camisa com bermuda preta e redução de 21kg',
  },
  {
    id: 'r02',
    beforeAlt: 'Antes: tronco sem camisa, em foto de espelho dentro de casa',
    afterAlt: 'Depois: corrida em uma pista de atletismo',
  },
  {
    id: 'r03',
    beforeAlt: 'Antes: homem sem camisa, de frente, com os braços ao lado do corpo',
    afterAlt: 'Depois: tronco mais definido, em foto de espelho',
  },
]

