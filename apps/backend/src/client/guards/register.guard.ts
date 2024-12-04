import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class TgRegisterGuard implements CanActivate {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: DB_TYPE) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const token = request.headers['x-telegram-auth']
    const user = new URLSearchParams(token).get('user') || ''
    const telegramId = parseInt(JSON.parse(user).id || '')

    if (!telegramId) {
      throw new UnauthorizedException()
    }

    request['userId'] = telegramId

    return true
  }
}
