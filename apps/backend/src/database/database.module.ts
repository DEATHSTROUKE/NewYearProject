import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from '../drizzle/schema/schema'
import { DATABASE_CONNECTION } from './db-connection'

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        return drizzle(configService.getOrThrow('DATABASE_URL'), {
          schema: {
            ...schema,
          },
          logger: configService.get('NODE_ENV') === 'development',
        })
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
