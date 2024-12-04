export type CreateTaskDto = {
  question: string
  answer: string
  meaning: string
  wordIndex: number
  startDate: string
}

export type UpdateTaskDto = Partial<CreateTaskDto>
