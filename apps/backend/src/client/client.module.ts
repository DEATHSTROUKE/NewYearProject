import { DatabaseModule } from '@/database/database.module'
import { Module } from '@nestjs/common'

import { ClientController } from './client.controller'
import { ClientService } from './client.service'

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
