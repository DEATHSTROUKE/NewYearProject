import dotenv from 'dotenv'
import { and, count, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema/schema'

dotenv.config({ path: '.env.production' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool, {
  schema: {
    ...schema,
  },
  logger: true,
})

async function seed() {
  const data = await db
    .select({
      id: schema.userTable.id,
      name: schema.userTable.name,
      surname: schema.userTable.surname,
      middleName: schema.userTable.middleName,
      email: schema.userTable.email,
      phone: schema.userTable.phone,
      place: schema.userTable.place,
      division: schema.userTable.division,
      // count: count(schema.attemptsTable.id),
    })
    .from(schema.userTable)
    .leftJoin(
      schema.attemptsTable,
      eq(schema.userTable.id, schema.attemptsTable.userId),
    )
    .leftJoin(
      schema.gameWordsTable,
      eq(schema.attemptsTable.wordId, schema.gameWordsTable.id),
    )
    .where(
      and(
        eq(schema.attemptsTable.isCorrect, false),
        eq(schema.gameWordsTable.wordIndex, 3),
      ),
    )
    .groupBy(schema.userTable.id)
    .having(eq(count(schema.attemptsTable.id), 5))

  console.info(data)

  pool.end()
}

seed()
