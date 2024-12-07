import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

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
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  place: string

  @IsString()
  @IsNotEmpty()
  division: string
}

// export type RegisterFields = {
//   name: string
//   surname: string
//   middleName: string
//   email: string
//   phone: string
//   place: string
//   division: string
// }

export type FieldsNames = keyof RegisterFields
