import { z } from 'zod'

import { IdNumSchema, IdSchema } from './global'

export const TaskData = z.object({
  id: IdSchema,
  visibility: z.boolean(),
  task: z.string(),
  location: z.string(),
  image: z.string().nullable(),
})

export type TTaskData = z.infer<typeof TaskData>

export const TasksData = TaskData.array()

export const TaskTextfieldData = z.object({
  type: z.literal('textfield'),
  options: z.string(),
})

export const TaskButtonsData = z.object({
  type: z.literal('buttons'),
  buttonsAmount: z.number(),
  correctAnswerNumber: z.number(),
  options: z.string().array(),
})

export const FullTaskForm = z.object({
  location: z.string().min(1),
  image: z.string().nullable(),
  score: z.number(),
  textForCorrectResponse: z.string(),
  textForIncorrectResponse: z.string(),
  htmlForIntroTask: z.string(),
  htmlForTask: z.string().min(1),
  answer: z.object({
    type: z.union([z.literal('buttons'), z.literal('textfield')]),
    // type: z.string(),
    buttons: z
      .object({
        buttonsAmount: z.number().min(1).max(10).default(1),
        correctAnswerNumber: z.number(),
        options: z
          .object({
            value: z.string().min(1),
          })
          .array(),
      })
      .optional()
      .refine(
        data =>
          !data ||
          (data.correctAnswerNumber >= 1 &&
            data.correctAnswerNumber <= data.buttonsAmount),
        { message: 'Укажите ответ из списка', path: ['correctAnswerNumber'] },
      ),
    textfield: z
      .object({
        options: z.string().min(1),
      })
      .optional(),
  }),
})

export type TFullTaskForm = z.infer<typeof FullTaskForm>

export const FullTaskFormToReq = FullTaskForm.transform(data => {
  const resData: TFullTask = {
    location: data.location,
    image: data.image,
    score: data.score,
    textForCorrectResponse: data.textForCorrectResponse,
    textForIncorrectResponse: data.textForIncorrectResponse,
    htmlForIntroTask: data.htmlForIntroTask,
    htmlForTask: data.htmlForTask,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    answer: {
      ...(data.answer.type === 'textfield'
        ? { ...data.answer.textfield, type: data.answer.type }
        : {
            type: data.answer.type,
            buttonsAmount: data.answer.buttons?.buttonsAmount,
            correctAnswerNumber: data.answer.buttons?.correctAnswerNumber,
            options: data.answer.buttons?.options.map(item => item.value),
          }),
    },
  }
  return resData
})

export const FullTask = z.object({
  location: z.string(),
  image: z.string().nullable(),
  score: z.number(),
  textForCorrectResponse: z.string(),
  textForIncorrectResponse: z.string(),
  htmlForIntroTask: z.string(),
  htmlForTask: z.string(),
  answer: z.discriminatedUnion('type', [TaskTextfieldData, TaskButtonsData]),
})

export type TFullTask = z.infer<typeof FullTask>

export const FullTaskToForm = FullTask.transform(data => {
  const resData: TFullTaskForm = {
    ...data,
    answer: {
      ...(data.answer.type === 'textfield'
        ? { textfield: { options: data.answer.options } }
        : {
            buttons: {
              buttonsAmount: data.answer.buttonsAmount,
              correctAnswerNumber: data.answer.correctAnswerNumber,
              options: data.answer.options.map(item => ({
                value: item,
              })),
            },
          }),
      type: data.answer.type,
    },
  }
  return resData
})

export const UpdateTaskRequestData = z
  .object({
    id: IdNumSchema,
    visibility: z.boolean(),
  })
  .array()

export type TUpdateTaskRequestData = z.infer<typeof UpdateTaskRequestData>
