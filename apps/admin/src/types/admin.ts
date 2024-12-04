import { z } from 'zod'

import { IdSchema } from './global'

export const AdminsData = z
  .object({
    id: IdSchema,
    mail: z.string().min(1),
  })
  .array()

export const AdminData = z.object({
  mail: z.string(),
})
