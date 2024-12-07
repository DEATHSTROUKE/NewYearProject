import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../guards/auth.guard'
import {
  PostApiAdminUserIdChangeIsLotteryUserBody,
  UserBasic,
  UserDetailed,
} from '../types/user.dto'
import { UserService } from './user.service'

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserBasic[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDetailed> {
    return this.userService.findOne(parseInt(id))
  }

  @Patch(':id/changeIsLotteryUser')
  async update(
    @Param('id') id: string,
    @Body() { isLotteryUser }: PostApiAdminUserIdChangeIsLotteryUserBody,
  ) {
    await this.userService.update(parseInt(id), { isLotteryUser })
    return { status: 'ok' }
  }
}
