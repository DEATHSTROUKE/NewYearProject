import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from '../schema/schema'
import { getRussianWords } from './russianWords'

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool, {
  schema: {
    ...schema,
  },
})

async function seed() {
  // await db.execute(sql`TRUNCATE TABLE ${schema.russianWordsTable}`)
  // await db.execute(sql`ALTER SEQUENCE russian_words_id_seq RESTART WITH 1`)

  // const russianWords = getRussianWords().map(word => ({ word }))

  // const rusWordsInserted = await db
  //   .insert(schema.russianWordsTable)
  //   .values(russianWords)
  //   .returning()

  // console.info(rusWordsInserted.length)

  // const adminTextsTitleEnum = [
  //   'beforeGame',
  //   'waitNextGame',
  //   'waitEndLottery',
  //   'afterLottery',
  //   'prizeLevel1',
  //   'prizeLevel2',
  //   'prizeLevel3',
  //   'prizeLevel4',
  //   'prizeLevel5',
  // ] as const

  // const adminTextsInserted = await db
  //   .insert(schema.adminTextsTable)
  //   .values(
  //     adminTextsTitleEnum.map(title => ({
  //       title,
  //       text: '',
  //       startDate: null,
  //       endDate: null,
  //     })),
  //   )
  //   .returning()

  // console.info(adminTextsInserted.length)

  const newAdmin = {
    login: process.env.ADMIN_LOGIN,
    password: process.env.ADMIN_PASSWORD,
  }

  if (newAdmin.login && newAdmin.password) {
    await db.insert(schema.adminTable).values({
      login: newAdmin.login,
      password: await bcrypt.hash(newAdmin.password, 10),
    })
  }
  pool.end()
}

seed()
