import { IsNotEmpty, IsString } from 'class-validator'

export class FeedbackData {
  @IsNotEmpty()
  @IsString()
  feedback: string
}

export class RegisterFields {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsString()
  @IsNotEmpty()
  middleName: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  place: string

  @IsString()
  @IsNotEmpty()
  division: string
}
