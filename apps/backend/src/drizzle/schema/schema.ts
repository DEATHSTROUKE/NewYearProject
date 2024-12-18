import { relations } from 'drizzle-orm'
import {
  bigint,
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

import { AdminTextsTitleEnum } from '../seed/constants'
import { cuid2 } from './cuid'

export const userTable = pgTable('users', {
  id: bigint({ mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  surname: varchar('surname', { length: 255 }).notNull(),
  middleName: varchar('middle_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 255 }).notNull(),
  place: varchar('place', { length: 255 }).notNull(),
  division: varchar('division', { length: 255 }).notNull(),
  lotteryNumber: integer('lottery_number').unique(),
  isLotteryUser: boolean('is_lottery_user').notNull().default(true),
  watchedResult: boolean('watched_result').notNull().default(false),
})

export const gameWordsTable = pgTable('game_words', {
  id: cuid2('id').primaryKey().defaultRandom(),
  question: text('question').notNull(),
  answer: varchar('answer', { length: 255 }).notNull(),
  meaning: text('meaning').notNull(),
  wordIndex: integer('word_index').notNull(),
  startDate: timestamp('start_date').notNull(),
})

export const adminTextsTable = pgTable('admin_texts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255, enum: AdminTextsTitleEnum })
    .notNull()
    .unique(),
  text: text('text').notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
})

export const adminTable = pgTable('admin', {
  id: serial('id').primaryKey(),
  login: varchar('login', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
})

export const attemptsTable = pgTable('attempts', {
  id: cuid2('id').primaryKey().defaultRandom(),
  answer: varchar('answer', { length: 255 }).notNull(),
  wordId: cuid2('word_id')
    .notNull()
    .references(() => gameWordsTable.id),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id),
  isCorrect: boolean('is_correct').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const userReviewsTable = pgTable('user_reviews', {
  id: cuid2('id').primaryKey().defaultRandom(),
  userId: integer('user_id')
    .notNull()
    .unique()
    .references(() => userTable.id),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const russianWordsTable = pgTable('russian_words', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 255 }).notNull(),
})

export const userTableRelations = relations(userTable, ({ many }) => ({
  attempts: many(attemptsTable),
  reviews: many(userReviewsTable),
}))

export const attemptsTableRelations = relations(attemptsTable, ({ one }) => ({
  user: one(userTable, {
    fields: [attemptsTable.userId],
    references: [userTable.id],
  }),
  word: one(gameWordsTable, {
    fields: [attemptsTable.wordId],
    references: [gameWordsTable.id],
  }),
}))

export const userReviewsTableRelations = relations(
  userReviewsTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [userReviewsTable.userId],
      references: [userTable.id],
    }),
  }),
)

export const gameWordsTableRelations = relations(
  gameWordsTable,
  ({ many }) => ({
    attempts: many(attemptsTable),
  }),
)
