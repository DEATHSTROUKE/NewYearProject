export type TRegisterFields = {
  name: string
  surname: string
  middleName: string
  email: string
  phone: string
  place: string
  division: string
}

export type FieldsNames = keyof TRegisterFields
