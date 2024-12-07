import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import * as schema from '@/drizzle/schema/schema'
import { Inject, Injectable } from '@nestjs/common'
import { count, eq } from 'drizzle-orm'

import { UserBasic, UserDetailed } from '../types/user.dto'

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
      })
      .from(schema.userTable)
    const correctAttempts = await this.db
      .select({ count: count() })
      .from(schema.attemptsTable)
      .where(eq(schema.attemptsTable.isCorrect, true))

    return users.map(user => {
      return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        middleName: user.middleName,
        phone: user.phone,
        correctAttempts: correctAttempts[0].count,
      }
    })
  }

  // TODO: should be UserDetailed
  async findOne(id: number): Promise<UserBasic> {
    const user = await this.db
      .select({
        id: schema.userTable.id,
        name: schema.userTable.name,
        surname: schema.userTable.surname,
        middleName: schema.userTable.middleName,
        phone: schema.userTable.phone,
        isLotteryUser: schema.userTable.isLotteryUser,
      })
      .from(schema.userTable)
      .where(eq(schema.userTable.id, id))

    return {
      id: user[0].id,
      name: user[0].name,
      surname: user[0].surname,
      middleName: user[0].middleName,
      phone: user[0].phone,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      isLotteryUser: user[0].isLotteryUser,
      correctAttempts: 0,
    }
  }
  async update(id: number, { isLotteryUser }: { isLotteryUser: boolean }) {
    await this.db
      .update(schema.userTable)
      .set({ isLotteryUser })
      .where(eq(schema.userTable.id, id))
  }
}
