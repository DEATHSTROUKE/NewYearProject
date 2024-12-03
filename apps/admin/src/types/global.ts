import { z } from 'zod'

export const IdSchema = z.coerce.string()

export const IdNullSchema = z.coerce.string().nullable()

export const IdNumSchema = IdSchema.transform(data => parseInt(data))

export const IdNullNumSchema = IdNullSchema.transform(value => {
  if (value === null) return value
  return parseInt(value) || null
})
