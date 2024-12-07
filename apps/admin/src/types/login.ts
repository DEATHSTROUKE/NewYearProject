import { z } from 'zod'

export const LoginRequestData = z.object({
  login: z.string().trim(),
  password: z.string().trim().min(1),
})

export type TLoginRequestData = z.infer<typeof LoginRequestData>

export const LoginResponseData = z.object({
  token: z.string(),
})

export const CheckResponseData = z.object({
  token: z.string(),
})
