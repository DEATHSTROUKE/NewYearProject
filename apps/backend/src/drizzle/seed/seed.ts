import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from '../schema/schema'
import { ADMIN_TEXTS, AdminTextsTitle, GAME_WORDS } from './constants'
import { getRussianWords } from './russianWords'

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool, {
  schema: {
    ...schema,
  },
  // logger: true,
})

async function seed() {
  await db.execute(sql`TRUNCATE TABLE ${schema.russianWordsTable} CASCADE`)
  await db.execute(sql`TRUNCATE TABLE ${schema.adminTextsTable} CASCADE`)
  await db.execute(sql`TRUNCATE TABLE ${schema.adminTable} CASCADE`)
  await db.execute(sql`TRUNCATE TABLE ${schema.attemptsTable} CASCADE`)
  await db.execute(sql`TRUNCATE TABLE ${schema.userReviewsTable} CASCADE`)
  await db.execute(sql`TRUNCATE TABLE ${schema.userTable} CASCADE`)
  await db.execute(sql`TRUNCATE TABLE ${schema.gameWordsTable} CASCADE`)

  await db.execute(sql`ALTER SEQUENCE admin_texts_id_seq RESTART WITH 1`)
  await db.execute(sql`ALTER SEQUENCE russian_words_id_seq RESTART WITH 1`)

  const russianWords = getRussianWords().map(word => ({ word }))

  const rusWordsInserted = await db
    .insert(schema.russianWordsTable)
    .values(russianWords)
    .returning()

  console.info('rusWordsInserted', rusWordsInserted.length)

  const gameWordsInserted = await db
    .insert(schema.gameWordsTable)
    .values(GAME_WORDS)
    .returning()

  console.info('gameWordsInserted', gameWordsInserted.length)

  const adminTextsInserted = await db
    .insert(schema.adminTextsTable)
    .values(
      Object.entries(ADMIN_TEXTS).map(([title, text]) => ({
        title: title as AdminTextsTitle,
        text,
        startDate: null,
        endDate: null,
      })),
    )
    .returning()

  console.info('adminTextsInserted', adminTextsInserted.length)

  const newAdmin = {
    login: process.env.ADMIN_LOGIN,
    password: process.env.ADMIN_PASSWORD,
  }

  if (newAdmin.login && newAdmin.password) {
    const admin = await db
      .insert(schema.adminTable)
      .values({
        login: newAdmin.login,
        password: await bcrypt.hash(newAdmin.password, 10),
      })
      .returning()

    console.info('newAdmin', admin)
  }

  pool.end()
}

seed()
