/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { AppModule } from './app.module'

dayjs.extend(isBetween)

declare module 'express' {
  interface Request {
    userId: number
  }
}

const globalPrefix = 'api'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(new ValidationPipe())
  const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

bootstrap()
