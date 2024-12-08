export type PostApiAdminUserIdChangeIsLotteryUserBody = {
  isLotteryUser: boolean
}

export type UserBasic = {
  id: number
  name: string
  surname: string
  middleName: string
  phone: string
  correctAttempts: number
}

export type UserDetailedReviews = {
  createdAt?: string
  text?: string
}

export type UserDetailedAnswersItemAttemptsItem = {
  createdAt: string
  id: string
  word: string
}

export type UserDetailedAnswersItem = {
  attempts: UserDetailedAnswersItemAttemptsItem[]
  correctWord: string
  id: string
}

export interface UserDetailed {
  answers: UserDetailedAnswersItem[]
  division: string
  email: string
  id: number
  lotteryNumber: number | null
  middleName: string
  name: string
  phone: string
  place: string
  reviews?: UserDetailedReviews
  surname: string
  isLotteryUser: boolean
}
