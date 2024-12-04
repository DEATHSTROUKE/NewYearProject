import { AdminTextsTitle } from '@shared'

export type EditTextDto = {
  title: AdminTextsTitle
  text: string
  startDate?: string
  endDate?: string
}
