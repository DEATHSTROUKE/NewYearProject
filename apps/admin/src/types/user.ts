import { z } from 'zod'

import { IdNullNumSchema, IdSchema } from './global'

export const UserState = z.object({
  id: IdSchema,
  excursionId: IdSchema,
  username: z.string().nullable(),
  score: z.number(),
  finishedTasks: z.number(),
  tasksAmount: z.number(),
})

export type TUserState = z.infer<typeof UserState>

export const ResponseHistory = z.object({
  excursionName: z.string(),
  userId: IdSchema,
  username: z.string().nullable(),
  tasks: z
    .object({
      textTask: z.string(),
      answer: z.string(),
      score: z.number(),
      time: z.string(),
    })
    .array(),
})

export type TResponseHistory = z.infer<typeof ResponseHistory>

export const FiltersData = z.object({
  finished: z.boolean(),
  excursionId: IdNullNumSchema,
})

export type TFiltersData = z.infer<typeof FiltersData>
