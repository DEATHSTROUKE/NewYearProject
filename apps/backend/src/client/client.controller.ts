import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { GetState, NewAttemptData } from '@shared'
import { Request } from 'express'

import { ClientService } from './client.service'
import { TgAuthGuard } from './guards/auth.guard'
import { TgRegisterGuard } from './guards/register.guard'
import { FeedbackData, RegisterFields } from './types/client.dto'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(TgAuthGuard)
  @Get('getState')
  async getState(@Req() request: Request): Promise<GetState | object> {
    return await this.clientService.getState(request['userId'])
  }

  @UseGuards(TgAuthGuard)
  @Post('new_attempt')
  async newAttempt(@Req() request: Request, @Body() body: NewAttemptData) {
    return await this.clientService.newAttempt(request['userId'], body)
  }

  @UseGuards(TgRegisterGuard)
  @Post('register')
  async register(@Req() request: Request, @Body() body: RegisterFields) {
    await this.clientService.register(request['userId'], body)
    return { status: 'ok' }
  }

  @UseGuards(TgAuthGuard)
  @Post('sendFeedback')
  async sendFeedback(@Req() request: Request, @Body() body: FeedbackData) {
    await this.clientService.sendFeedback(request['userId'], body)
    return { status: 'ok' }
  }
}
