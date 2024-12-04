import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import { Inject, Injectable } from '@nestjs/common'
import { FeedbackData, GetState, NewAttemptData, RegisterFields } from '@shared'

import * as schema from '../drizzle/schema/schema'

@Injectable()
export class ClientService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: DB_TYPE,
  ) {}

  async getState(userId: number): Promise<GetState | object> {
    return {}
  }

  async newAttempt(userId: number, attemptRequest: NewAttemptData) {
    return
  }

  async register(userId: number, registerData: RegisterFields) {
    return await this.db
      .insert(schema.userTable)
      .values([
        {
          id: userId,
          ...registerData,
        },
      ])
      .returning()
  }

  async sendFeedback(userId: number, data: FeedbackData) {
    const reviewQuestion = await this.db.query.reviewQuestionsTable.findFirst()

    if (!reviewQuestion) {
      throw new Error('No review question')
    }

    await this.db.insert(schema.userReviewsTable).values({
      userId,
      text: data.feedback,
      reviewId: reviewQuestion?.id,
    })
  }
}
