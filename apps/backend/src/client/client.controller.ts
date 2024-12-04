import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { FeedbackData, GetState, NewAttemptData, RegisterFields } from '@shared'
import { Request } from 'express'

import { ClientService } from './client.service'
import { TgAuthGuard } from './guards/auth.guard'
import { TgRegisterGuard } from './guards/register.guard'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(TgAuthGuard)
  @Get('getState')
  getState(@Req() request: Request): GetState | object {
    return this.clientService.getState(request['userId'])
  }

  @UseGuards(TgAuthGuard)
  @Post('new_attempt')
  newAttempt(@Req() request: Request, @Body() body: NewAttemptData) {
    return this.clientService.newAttempt(request['userId'], body)
  }

  @UseGuards(TgRegisterGuard)
  @Post('register')
  register(@Req() request: Request, @Body() body: RegisterFields) {
    return this.clientService.register(request['userId'], body)
  }

  @UseGuards(TgAuthGuard)
  @Post('sendFeedback')
  sendFeedback(@Req() request: Request, @Body() body: FeedbackData) {
    return this.clientService.sendFeedback(request['userId'], body)
  }
}
