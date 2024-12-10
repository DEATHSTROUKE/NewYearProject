import { Letter } from './game'

export type GameState =
  | 'beforeGame'
  | 'inGame'
  | 'waitFeedback'
  | 'waitNextGame'
  | 'waitEndLottery'
  | 'afterLottery'

export type Gifts = {
  prizesText: string[]
  activeGifts: number
}

export type BeforeGameState = {
  gameState: 'beforeGame'
  text: string
}

export type InGameState = {
  gameState: 'inGame'
  text: string
  letters: Letter[]
  wordLength: number
  currentLine: number
  hasNextButton: boolean
  isFinished: boolean
} & Gifts

export type WaitFeedbackState = {
  gameState: 'waitFeedback'
  feedbackQuestion: string
  afterFeedbackResponse: string
} & Gifts

export type WaitNextGameState = {
  gameState: 'waitNextGame'
  text: string
} & Gifts

export type WaitEndLotteryState = {
  gameState: 'waitEndLottery'
  text: string
  lotteryTime: string | null
  ticketNumber: number
  textWithLink: string
} & Gifts

export type AfterLotteryState = {
  gameState: 'afterLottery'
  text: string
} & Gifts

export type GetState =
  | BeforeGameState
  | InGameState
  | WaitFeedbackState
  | WaitNextGameState
  | WaitEndLotteryState
  | AfterLotteryState
