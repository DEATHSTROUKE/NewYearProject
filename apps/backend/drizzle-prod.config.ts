import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import path from 'path'

const envPath = path.join(__dirname, '../..', '/.env.production')
console.log(envPath)

dotenv.config({ path: envPath })
console.info('migrate prod db', process.env.DATABASE_URL)

export default defineConfig({
  schema: 'apps/backend/src/drizzle/schema/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  out: 'apps/backend/src/drizzle/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
})
