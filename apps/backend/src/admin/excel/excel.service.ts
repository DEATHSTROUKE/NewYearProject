import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import * as schema from '@/drizzle/schema/schema'
import { Inject, Injectable } from '@nestjs/common'
import { and, count, eq, isNotNull } from 'drizzle-orm'
import xlsx from 'xlsx'

@Injectable()
export class ExcelService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: DB_TYPE) {}

  async getExcelAllReviews() {
    const reviews = await this.db
      .select({
        phone: schema.userTable.phone,
        review: schema.userReviewsTable.text,
      })
      .from(schema.userReviewsTable)
      .leftJoin(
        schema.userTable,
        eq(schema.userTable.id, schema.userReviewsTable.userId),
      )

    const worbookJson = reviews.map(review => {
      return {
        Телефон: `+7${review.phone}`,
        Отзыв: review.review,
      }
    })

    const workbook = xlsx.utils.book_new()
    const worksheet = xlsx.utils.json_to_sheet(worbookJson)
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Отзывы')

    console.info(worbookJson)

    const csvBuffer = xlsx.write(workbook, {
      bookType: 'csv',
      type: 'buffer',
    })

    return csvBuffer
  }

  async getExcelLotteryNumbers() {
    const users = await this.db
      .select({
        id: schema.userTable.id,
        phone: schema.userTable.phone,
        surname: schema.userTable.surname,
        name: schema.userTable.name,
        middleName: schema.userTable.middleName,
        lotteryNumber: schema.userTable.lotteryNumber,
        correctAnswers: count(schema.attemptsTable.id),
      })
      .from(schema.userTable)
      .where(
        and(
          eq(schema.userTable.isLotteryUser, true),
          isNotNull(schema.userTable.lotteryNumber),
        ),
      )
      .leftJoin(
        schema.attemptsTable,
        and(
          eq(schema.attemptsTable.userId, schema.userTable.id),
          eq(schema.attemptsTable.isCorrect, true),
        ),
      )
      .groupBy(schema.userTable.id)

    const workbook = xlsx.utils.book_new()

    for (let i = 1; i <= 5; i++) {
      const worbookJson = users
        .filter(user => user.correctAnswers >= i)
        .map(user => {
          return {
            Фамилия: user.surname,
            Имя: user.name,
            Отчество: user.middleName,
            Телефон: `+7${user.phone}`,
            'Номер в лоттерее': user.lotteryNumber,
          }
        })

      const worksheet = xlsx.utils.json_to_sheet(worbookJson)
      xlsx.utils.book_append_sheet(
        workbook,
        worksheet,
        `Подарки ${i}-го уровня`,
      )
    }

    const csvBuffer = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    })

    return csvBuffer
  }
}
