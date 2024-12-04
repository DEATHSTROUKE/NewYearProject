import { z } from 'zod'

import { IdSchema } from './global'

export const BaseAchievement = z.object({
  name: z.string().min(1),
  score: z.number().min(0),
  image: z.string().nullable(),
})

export const VisibleAchievementData = BaseAchievement.merge(
  z.object({ id: IdSchema }),
)

export type TVisibleAchievementData = z.infer<typeof VisibleAchievementData>

export const FullAchievement = BaseAchievement.merge(
  z.object({
    shareText: z.string(),
  }),
)

export type TFullAchievement = z.infer<typeof FullAchievement>
