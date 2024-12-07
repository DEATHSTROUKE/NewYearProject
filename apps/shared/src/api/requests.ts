import { IsNotEmpty, IsString } from 'class-validator'

export class FeedbackData {
  @IsNotEmpty()
  @IsString()
  feedback: string
}

// export type FeedbackData = {
//   feedback: string
// }

export type NewAttemptData = {
  word: string
}
