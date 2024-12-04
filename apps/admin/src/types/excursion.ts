import { z } from 'zod'

import { IdNullSchema, IdSchema } from './global'

export const ExcursionSchema = z.object({
  id: IdSchema,
  name: z.string(),
})

export type TExcursion = z.infer<typeof ExcursionSchema>

export const ExcursionsData = z.object({
  id: IdNullSchema,
  name: z.string().nullable(),
  tours: ExcursionSchema.array(),
})

export type TExcursionsData = z.infer<typeof ExcursionsData>

export const NewExcursionRequestData = z.object({
  name: z.string(),
  copyExcursionId: z.number().nullable(),
})

export type TNewExcursionRequestData = z.infer<typeof NewExcursionRequestData>
