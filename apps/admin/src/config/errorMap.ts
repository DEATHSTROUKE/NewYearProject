import { z } from 'zod'

const customMapError: z.ZodErrorMap = (issue, ctx) => {
  console.log(issue)

  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'string') {
      return { message: 'Поле не может быть пустым' }
    }

    if (issue.type === 'number') {
      return { message: `Число не должно быть не меньше ${issue.minimum}` }
    }
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'number') {
      return { message: `Число должно быть не больше ${issue.maximum}` }
    }
  }

  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === 'number') {
      return { message: 'Введите число' }
    }
  }

  return { message: ctx.defaultError }
}

z.setErrorMap(customMapError)
