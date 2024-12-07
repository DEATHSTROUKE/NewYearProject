import dayjs from 'dayjs'

const date = dayjs().add(10 * 60 * 1000)

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

export const ADMIN_TEXTS = {
  beforeGame: 'Первая игра начнётся 16.12 декабря в 10:00!',
  waitNextGame:
    'На сегодня ты выполнил все задания, приходи завтра, чтобы заработать новые призы!',
  waitEndLottery: '',
  afterLottery: '',
  feedbackQuestion:
    'Напишите свои пожелания и ожидания для команды «Благополучия» на следующий год.',
  afterFeedbackResponse: 'Спасибо за пожелания!',
  prizeLevel1: 'Ура, вы участник розыгрыша подарков 1-го уровня',
  prizeLevel2: 'Ура, вы участник розыгрыша подарков 2-го уровня',
  prizeLevel3: 'Ура, вы участник розыгрыша подарков 3-го уровня',
  prizeLevel4: 'Ура, вы участник розыгрыша подарков 4-го уровня',
  prizeLevel5: 'Ура, вы участник розыгрыша подарков 5-го уровня',
  textWithLink: '',
} as const

export const GAME_WORDS = [
  {
    question: '',
    answer: 'Вебинар',
    meaning: '',
    wordIndex: 0,
    startDate: date.add(1 * 10, 'minute').toDate(),
  },
  {
    question: '',
    answer: 'Эйчарик',
    meaning: '',
    wordIndex: 1,
    startDate: date.add(2 * 10, 'minute').toDate(),
  },
  {
    question: '',
    answer: 'Флешмоб',
    meaning: '',
    wordIndex: 2,
    startDate: date.add(3 * 10, 'minute').toDate(),
  },
  {
    question: '',
    answer: 'Льгота',
    meaning: '',
    wordIndex: 3,
    startDate: date.add(4 * 10, 'minute').toDate(),
  },
  {
    question: '',
    answer: 'Каникулы',
    meaning: '',
    wordIndex: 4,
    startDate: date.add(5 * 10, 'minute').toDate(),
  },
]
