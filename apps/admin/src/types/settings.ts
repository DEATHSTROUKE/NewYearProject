import { z } from 'zod'

import { IdNullNumSchema, IdNullSchema } from './global'

export const SettingsResData = z.object({
  pinCodeText: z.string(),
  pinCode: z.string(),
  helloText: z.string(),
  shareText: z.string(),
  notFoundText: z.string(),
  startTime: z.string().transform(data => (data ? data.split('.')[0] : null)),
  endTime: z.string().transform(data => (data ? data.split('.')[0] : null)),
  mainExcursionId: IdNullSchema,
})

export const SettingsData = z
  .object({
    pinCodeText: z.string().min(1),
    pinCode: z
      .string()
      .length(4, { message: 'Пинкод должен содержать 4 символа' }),
    helloText: z.string().min(1),
    shareText: z.string().min(1),
    notFoundText: z.string().min(1),
    startTime: z.string().transform(data => (data ? data.split('.')[0] : null)),
    endTime: z.string().transform(data => (data ? data.split('.')[0] : null)),
    mainExcursionId: IdNullSchema,
  })
  .refine(
    data => {
      if (
        !data.startTime ||
        !data.endTime ||
        new Date(data.startTime).getTime() <= new Date(data.endTime).getTime()
      ) {
        return true
      }
    },
    { message: 'Дата конца должна быть больше даты начала', path: ['endTime'] },
  )

export const SettingsDataToSend = SettingsData.transform(data => {
  return {
    ...data,
    mainExcursionId: IdNullNumSchema.parse(data.mainExcursionId),
  }
})

export type TSettingsData = z.infer<typeof SettingsData>
export type TSettingsDataToSend = z.infer<typeof SettingsDataToSend>
