import { z } from 'zod'

export const LoginRequestData = z.object({
  mail: z
    .string()
    .trim()
    .regex(/.*@avito\.ru$/, { message: 'Используйте почту @avito.ru ' }),
  password: z.string().trim().min(1),
})

export type TLoginRequestData = z.infer<typeof LoginRequestData>

export const LoginResponseData = z.object({
  token: z.string(),
})

export const CheckResponseData = z.object({
  token: z.string(),
  mail: z.string(),
})
