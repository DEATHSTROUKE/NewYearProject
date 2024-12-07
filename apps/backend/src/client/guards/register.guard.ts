import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiErrorString } from '@shared'

import { getTelegramId } from './getTelegramId'

@Injectable()
export class TgRegisterGuard implements CanActivate {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: DB_TYPE) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const telegramId = getTelegramId(request.headers['x-telegram-auth'])

    if (!telegramId) {
      throw new UnauthorizedException(ApiErrorString.BadRequest)
    }

    request['userId'] = telegramId

    return true
  }
}
