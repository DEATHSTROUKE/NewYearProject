import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AdminModule } from './admin/admin.module'
import { ClientModule } from './client/client.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    ClientModule,
    DatabaseModule,
  ],
})
export class AppModule {}
