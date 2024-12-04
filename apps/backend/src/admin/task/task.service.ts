import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import * as schema from '@/drizzle/schema/schema'
import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'

import { CreateTaskDto, UpdateTaskDto } from '../types/task.dto'

@Injectable()
export class TaskService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: DB_TYPE) {}

  async findAll() {
    return this.db.query.gameWordsTable.findMany()
  }

  async create(task: CreateTaskDto) {
    const newTask = await this.db
      .insert(schema.gameWordsTable)
      .values([
        {
          question: task.question,
          answer: task.answer,
          meaning: task.meaning,
          wordIndex: task.wordIndex,
          startDate: new Date(task.startDate),
        },
      ])
      .returning()
    return newTask
  }

  async update(id: string, task: UpdateTaskDto) {
    const set: Record<string, unknown> = { ...task }

    if (task.startDate) {
      set.startDate = new Date(task.startDate)
    }

    return await this.db
      .update(schema.gameWordsTable)
      .set(set)
      .where(eq(schema.gameWordsTable.id, id))
      .returning()
  }

  async remove(id: string) {
    return await this.db
      .delete(schema.gameWordsTable)
      .where(eq(schema.gameWordsTable.id, id))
  }
}
