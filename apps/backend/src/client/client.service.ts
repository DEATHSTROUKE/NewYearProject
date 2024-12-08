import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import {
  AfterLotteryState,
  ApiErrorString,
  BeforeGameState,
  GetState,
  Gifts,
  InGameState,
  NewAttemptData,
  WaitEndLotteryState,
  WaitFeedbackState,
  WaitNextGameState,
} from '@shared'
import dayjs from 'dayjs'
import { and, count, desc, eq, inArray, lt } from 'drizzle-orm'

import * as schema from '../drizzle/schema/schema'
import { FeedbackData, RegisterFields } from './types/client.dto'
import { checkWord } from './utils/checkWord'

@Injectable()
export class ClientService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: DB_TYPE,
  ) {}

  async getState(userId: number): Promise<GetState | object> {
    const adminTexts = await this.db.query.adminTextsTable.findMany({
      where: inArray(schema.adminTextsTable.title, [
        'feedbackQuestion',
        'waitEndLottery',
      ]),
    })
    const tasks = await this.db.query.gameWordsTable.findMany({
      orderBy: schema.gameWordsTable.wordIndex,
    })

    const user = await this.db.query.userTable.findFirst({
      columns: {
        watchedResult: true,
      },
      where: eq(schema.userTable.id, userId),
    })

    const feedbackEntity = adminTexts.find(
      adminText => adminText.title === 'feedbackQuestion',
    )
    const lotteryEntity = adminTexts.find(
      adminText => adminText.title === 'waitEndLottery',
    )

    const firstWordStartDate = tasks[0].startDate
    const lastWordEndDate = dayjs(tasks[4].startDate).add(24, 'hour')

    if (dayjs().isBefore(firstWordStartDate)) {
      console.info('beforeGame')
      return this.getBeforeGameState()
    }

    console.info(firstWordStartDate, lastWordEndDate, dayjs())
    console.info(dayjs().isBetween(firstWordStartDate, lastWordEndDate))

    const { done: doneCurWord, wordIndex } = await this.isDoneCurrentWord(
      userId,
    )

    console.info(doneCurWord, wordIndex)

    if (
      dayjs().isBetween(firstWordStartDate, lastWordEndDate) &&
      (!doneCurWord || (doneCurWord && !user?.watchedResult))
    ) {
      if (!doneCurWord) {
        console.info('inGame')
        return this.getInGameState(userId)
      } else if (doneCurWord && !user?.watchedResult) {
        console.info('inGame')
        await this.updateUserWatchedResult(userId, true)
        return this.getInGameState(userId)
      }
    }

    const doneFeedback = await this.isDoneFeedback(userId)
    if (
      !doneFeedback &&
      ((dayjs().isBetween(
        lastWordEndDate.subtract(24, 'hour'),
        lastWordEndDate,
      ) &&
        doneCurWord) ||
        (dayjs().isBetween(lastWordEndDate, feedbackEntity?.endDate) &&
          doneCurWord))
    ) {
      console.info('waitFeedback')
      return this.getWaitFeedbackState(userId)
    }

    if (
      dayjs().isBetween(firstWordStartDate, lotteryEntity?.startDate) &&
      ((doneCurWord && wordIndex !== 4) ||
        (doneCurWord && doneFeedback && wordIndex === 4))
    ) {
      console.info('waitNextGame')
      return this.getWaitNextGameState(userId)
    }

    if (dayjs().isBetween(lotteryEntity?.startDate, lotteryEntity?.endDate)) {
      console.info('waitEndLottery')
      return this.getWaitEndLotteryState(userId)
    }

    if (dayjs().isAfter(lotteryEntity?.endDate)) {
      console.info('afterLottery')
      return this.getAfterLotteryState(userId)
    }

    return { status: 'ok' }
  }

  private async updateUserWatchedResult(
    userId: number,
    watchedResult: boolean,
  ) {
    await this.db
      .update(schema.userTable)
      .set({ watchedResult: watchedResult })
      .where(eq(schema.userTable.id, userId))
  }

  private async getUserGifts(userId: number): Promise<Gifts> {
    const gifts = await this.db
      .select({ count: count() })
      .from(schema.attemptsTable)
      .where(
        and(
          eq(schema.attemptsTable.userId, userId),
          eq(schema.attemptsTable.isCorrect, true),
        ),
      )

    const giftTexts = await this.db.query.adminTextsTable.findMany({
      where: inArray(schema.adminTextsTable.title, [
        'prizeLevel1',
        'prizeLevel2',
        'prizeLevel3',
        'prizeLevel4',
        'prizeLevel5',
      ]),
      columns: { text: true },
    })

    const giftCount = gifts[0].count

    return {
      activeGifts: giftCount,
      prizesText: giftTexts.map(gift => gift.text).slice(0, giftCount),
    }
  }

  private async isDoneCurrentWord(
    userId: number,
  ): Promise<{ done: boolean; wordIndex: number }> {
    const word = await this.getCurrentWord()
    if (!word) return { done: false, wordIndex: 0 }

    const attempts = await this.db.query.attemptsTable.findMany({
      where: and(
        eq(schema.attemptsTable.userId, userId),
        eq(schema.attemptsTable.wordId, word.id),
      ),
    })

    if (attempts.length >= 5 || attempts.some(attempt => attempt.isCorrect))
      return { done: true, wordIndex: word.wordIndex }
    return { done: false, wordIndex: word.wordIndex }
  }

  private async isDoneFeedback(userId: number): Promise<boolean> {
    const review = await this.db.query.userReviewsTable.findFirst({
      where: eq(schema.userReviewsTable.userId, userId),
      columns: { id: true },
    })
    return !!review
  }

  private async getCurrentWord() {
    const now = new Date()
    const task = await this.db.query.gameWordsTable.findFirst({
      where: lt(schema.gameWordsTable.startDate, now),
      orderBy: [desc(schema.gameWordsTable.wordIndex)],
    })

    return task
  }

  private async getBeforeGameState(): Promise<BeforeGameState> {
    const text = await this.db.query.adminTextsTable.findFirst({
      where: eq(schema.adminTextsTable.title, 'beforeGame'),
    })

    return {
      gameState: 'beforeGame',
      text: text?.text || '',
    }
  }

  private async getInGameState(userId: number): Promise<InGameState> {
    const correctWord = await this.getCurrentWord()
    if (!correctWord) {
      throw new BadRequestException(ApiErrorString.BadRequest)
    }

    const attempts = await this.db.query.attemptsTable.findMany({
      where: and(
        eq(schema.attemptsTable.userId, userId),
        eq(schema.attemptsTable.wordId, correctWord.id),
      ),
    })

    const letters = attempts.map(attempt => {
      return checkWord(attempt.answer, correctWord.answer)
    })

    if (!letters) {
      throw new BadRequestException(ApiErrorString.BadRequest)
    }

    console.info({ correctWord, attempts })
    const isFinished = attempts.some(attempt => attempt.isCorrect)

    return {
      gameState: 'inGame',
      text: correctWord.question,
      letters: letters.flat().filter(item => item !== undefined),
      wordLength: correctWord.answer.length,
      currentLine: attempts.length,
      isFinished,
      hasNextButton: correctWord.wordIndex === 4 && isFinished,
      ...(await this.getUserGifts(userId)),
    }
  }

  private async getWaitNextGameState(
    userId: number,
  ): Promise<WaitNextGameState> {
    const text = await this.db.query.adminTextsTable.findFirst({
      where: eq(schema.adminTextsTable.title, 'waitNextGame'),
    })

    return {
      gameState: 'waitNextGame',
      text: text?.text || '',
      ...(await this.getUserGifts(userId)),
    }
  }

  private async getWaitFeedbackState(
    userId: number,
  ): Promise<WaitFeedbackState> {
    const text = await this.db.query.adminTextsTable.findMany({
      where: inArray(schema.adminTextsTable.title, [
        'feedbackQuestion',
        'afterFeedbackResponse',
      ]),
    })

    return {
      gameState: 'waitFeedback',
      afterFeedbackResponse:
        text.find(text => text.title === 'afterFeedbackResponse')?.text || '',
      feedbackQuestion:
        text.find(text => text.title === 'feedbackQuestion')?.text || '',
      ...(await this.getUserGifts(userId)),
    }
  }

  private async getWaitEndLotteryState(
    userId: number,
  ): Promise<WaitEndLotteryState> {
    const text = await this.db.query.adminTextsTable.findMany({
      where: inArray(schema.adminTextsTable.title, [
        'textWithLink',
        'waitEndLottery',
      ]),
    })

    const user = await this.db.query.userTable.findFirst({
      where: eq(schema.userTable.id, userId),
      columns: { lotteryNumber: true },
    })

    return {
      gameState: 'waitEndLottery',
      text: text?.find(text => text.title === 'waitEndLottery')?.text || '',
      lotteryTime:
        text
          ?.find(text => text.title === 'waitEndLottery')
          ?.endDate?.toISOString() || null,
      ticketNumber: user?.lotteryNumber || 0,
      textWithLink:
        text?.find(text => text.title === 'textWithLink')?.text || '',
      ...(await this.getUserGifts(userId)),
    }
  }

  private async getAfterLotteryState(
    userId: number,
  ): Promise<AfterLotteryState> {
    const gifts = await this.getUserGifts(userId)
    const text = await this.db.query.adminTextsTable.findFirst({
      where: eq(schema.adminTextsTable.title, 'afterLottery'),
    })

    return {
      gameState: 'afterLottery',
      text: text?.text || '',
      activeGifts: gifts.activeGifts,
    }
  }

  async newAttempt(userId: number, attemptRequest: NewAttemptData) {
    const word = attemptRequest.word.toLowerCase()
    const isWordexist = await this.db.query.russianWordsTable.findFirst({
      where: eq(schema.russianWordsTable.word, word),
    })

    if (!isWordexist) {
      throw new BadRequestException(ApiErrorString.NoWordInDictionary)
    }

    const correctWord = await this.getCurrentWord()
    if (!correctWord) {
      throw new BadRequestException(ApiErrorString.BadRequest)
    }

    const countAttempts = await this.db
      .select({ count: count() })
      .from(schema.attemptsTable)
      .where(
        and(
          eq(schema.attemptsTable.userId, userId),
          eq(schema.attemptsTable.wordId, correctWord.id),
        ),
      )

    if (countAttempts[0].count >= 5) {
      throw new BadRequestException(ApiErrorString.NotValid)
    }

    const isCorrect = word.toLowerCase() === correctWord.answer.toLowerCase()

    await this.db
      .insert(schema.attemptsTable)
      .values([
        {
          userId,
          wordId: correctWord.id,
          answer: word,
          isCorrect,
        },
      ])
      .returning()

    await this.updateUserWatchedResult(userId, false)

    if (isCorrect) {
      return { isCorrect: true }
    }
    return { isCorrect: false }
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
    await this.db.insert(schema.userReviewsTable).values({
      userId,
      text: data.feedback,
    })

    const maxLotteryNumber = await this.db.query.userTable.findFirst({
      columns: { lotteryNumber: true },
      orderBy: desc(schema.userTable.lotteryNumber),
    })

    if (
      !maxLotteryNumber ||
      !maxLotteryNumber.lotteryNumber ||
      maxLotteryNumber.lotteryNumber < 100
    ) {
      await this.db
        .update(schema.userTable)
        .set({ lotteryNumber: 100 })
        .where(eq(schema.userTable.id, userId))
    } else {
      await this.db
        .update(schema.userTable)
        .set({ lotteryNumber: maxLotteryNumber.lotteryNumber + 1 })
        .where(eq(schema.userTable.id, userId))
    }
  }
}
