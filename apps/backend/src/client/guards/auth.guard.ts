import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import * as schema from '@/drizzle/schema/schema'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiErrorString } from '@shared'
import { eq } from 'drizzle-orm'

import { getTelegramId } from './getTelegramId'

@Injectable()
export class TgAuthGuard implements CanActivate {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: DB_TYPE) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const telegramId = getTelegramId(request.headers['x-telegram-auth'])

    if (!telegramId) {
      throw new UnauthorizedException(ApiErrorString.NotRegistered)
    }

    const user = await this.db.query.userTable.findFirst({
      where: eq(schema.userTable.id, telegramId),
    })

    if (!user) {
      throw new UnauthorizedException(ApiErrorString.NotRegistered)
    }

    request['userId'] = telegramId

    return true
  }
}
