import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import * as schema from '@/drizzle/schema/schema'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { and, asc, count, eq } from 'drizzle-orm'

import {
  UserBasic,
  UserDetailed,
  UserDetailedAnswersItem,
} from '../types/user.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: DB_TYPE,
  ) {}

  async findAll(): Promise<UserBasic[]> {
    const users = await this.db
      .select({
        id: schema.userTable.id,
        name: schema.userTable.name,
        surname: schema.userTable.surname,
        middleName: schema.userTable.middleName,
        phone: schema.userTable.phone,
        correctAttempts: count(schema.attemptsTable.id),
      })
      .from(schema.userTable)
      .leftJoin(
        schema.attemptsTable,
        eq(schema.userTable.id, schema.attemptsTable.userId),
      )
      .where(eq(schema.attemptsTable.isCorrect, true))
      .groupBy(schema.userTable.id)

    return users
  }

  async findOne(id: number): Promise<UserDetailed> {
    const user = await this.db.query.userTable.findFirst({
      columns: {
        id: true,
        name: true,
        surname: true,
        middleName: true,
        phone: true,
        place: true,
        division: true,
        email: true,
        lotteryNumber: true,
        isLotteryUser: true,
      },
      where: eq(schema.userTable.id, id),
    })

    if (!user) throw new BadRequestException('User not found')

    const answersRaw = await this.db
      .select({
        id: schema.gameWordsTable.id,
        correctWord: schema.gameWordsTable.answer,
        attempt: {
          id: schema.attemptsTable.id,
          word: schema.attemptsTable.answer,
          createdAt: schema.attemptsTable.createdAt,
        },
      })
      .from(schema.gameWordsTable)
      .orderBy(
        asc(schema.gameWordsTable.wordIndex),
        asc(schema.attemptsTable.createdAt),
      )
      .leftJoin(
        schema.attemptsTable,
        and(
          eq(schema.attemptsTable.wordId, schema.gameWordsTable.id),
          eq(schema.attemptsTable.userId, id),
        ),
      )

    const answers = answersRaw.reduce((acc, answer) => {
      let newAttempt
      if (answer.attempt) {
        newAttempt = {
          id: answer.attempt.id,
          word: answer.attempt.word,
          createdAt: answer.attempt.createdAt.toISOString(),
        }
      }

      const existingAnswer = acc.find(item => item.id === answer.id)
      if (existingAnswer && newAttempt) {
        existingAnswer.attempts.push(newAttempt)
        return acc
      }

      acc.push({
        id: answer.id,
        correctWord: answer.correctWord,
        attempts: newAttempt ? [newAttempt] : [],
      })

      return acc
    }, [] as UserDetailedAnswersItem[])

    const reviews = await this.db.query.userReviewsTable.findFirst({
      where: eq(schema.userReviewsTable.userId, id),
      columns: {
        createdAt: true,
        text: true,
      },
    })

    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      middleName: user.middleName,
      phone: user.phone,
      place: user.place,
      division: user.division,
      email: user.email,
      lotteryNumber: user.lotteryNumber,
      isLotteryUser: user.isLotteryUser,
      reviews: reviews
        ? { text: reviews.text, createdAt: reviews.createdAt.toISOString() }
        : undefined,
      answers,
    }
  }

  async update(id: number, { isLotteryUser }: { isLotteryUser: boolean }) {
    await this.db
      .update(schema.userTable)
      .set({ isLotteryUser })
      .where(eq(schema.userTable.id, id))
  }
}
