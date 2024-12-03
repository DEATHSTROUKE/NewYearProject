import { z } from 'zod'

import { IdNullNumSchema } from './global'

export const BotNotificationData = z.object({
  excursionId: IdNullNumSchema,
  htmlText: z.string().min(1),
  image: z.string().nullable(),
})

export type TBotNotificationData = z.infer<typeof BotNotificationData>
