import { NodePgDatabase } from 'drizzle-orm/node-postgres'

import * as schema from '../drizzle/schema/schema'

export const DATABASE_CONNECTION = 'database_connection'
export type DB_TYPE = NodePgDatabase<typeof schema>
