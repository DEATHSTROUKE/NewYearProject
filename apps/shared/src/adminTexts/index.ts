export const AdminTextsTitleEnum = [
  'beforeGame',
  'waitNextGame',
  'waitEndLottery',
  'afterLottery',
  'feedbackQuestion',
  'afterFeedbackResponse',
  'prizeLevel1',
  'prizeLevel2',
  'prizeLevel3',
  'prizeLevel4',
  'prizeLevel5',
  'textWithLink',
] as const

export type AdminTextsTitle = (typeof AdminTextsTitleEnum)[number]

export const AdminTextsTitleHumanReadable: Record<AdminTextsTitle, string> = {
  beforeGame: 'Текст до начала игры',
  waitNextGame: 'Текст при ожидании начала следующей игры',
  waitEndLottery: 'Текст при ожидании конца розыгрыша призов',
  afterLottery: 'Текст после розыгрыша призов',
  feedbackQuestion: 'Вопрос для отзыва',
  afterFeedbackResponse: 'Текст после ответа на вопрос отзыва',
  prizeLevel1: 'Текст для призового уровня 1',
  prizeLevel2: 'Текст для призового уровня 2',
  prizeLevel3: 'Текст для призового уровня 3',
  prizeLevel4: 'Текст для призового уровня 4',
  prizeLevel5: 'Текст для призового уровня 5',
  textWithLink: 'Текст под шаром на странице с розыгрышем призов',
}

export const DATETIME_TEXTS: AdminTextsTitle[] = [
  'waitEndLottery',
  'feedbackQuestion',
]
