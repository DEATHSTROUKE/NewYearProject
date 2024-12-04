import { AxiosError } from 'axios'
import { z } from 'zod'

const ERROR_TEXT: Record<string, string> = {
  badRequest: 'Некорректный запрос',

  existExcursion: 'Такое имя экскурсии уже существует',
  existAdmin: 'Админ с такой почтой уже существует',

  noExcursions: 'Экскурсия не найдена',
  noUserAndExcursion: 'Нет пользователя или экскурсии',
  noAvitoMail: 'Введите почту @avito.ru',
  noTask: 'Задание не найдено',
  noAchievement: 'Ачивка не найдена',

  incorrectSizeImage: 'Некорректный размер изображения',
  incorrectScore: 'Некорректное число очков',
  incorrectButtonsAmount: 'Некорректное количество ответов',
  incorrectAnswerIndex: 'Некорректный индекс ответа',

  incorrectPassword: 'Некорректный пароль',
  notAuthorized: 'Необходима авторизация',

  workingExcursion: 'Действие невозможно во время проведения экскурсии',
}

const ErrorSchema = z.object({
  response: z.object({
    data: z.object({
      exception: z.string(),
    }),
  }),
})

export const getErrorText = (error: Error) => {
  if (error instanceof AxiosError) {
    const err = ErrorSchema.safeParse(error)

    if (err.success) {
      const errData = err.data
      const errMessage = ERROR_TEXT[errData.response.data.exception] || null

      if (errMessage) return errMessage
    }
  }

  return 'Ошибка сервера'
}
