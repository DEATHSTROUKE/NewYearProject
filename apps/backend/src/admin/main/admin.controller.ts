import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../guards/auth.guard'
import { EditTextDto } from '../types/admin.dto'
import { AdminService } from './admin.service'

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/sign_in')
  async signIn(@Body() body: { login: string; password: string }) {
    return this.adminService.signIn(body)
  }

  @UseGuards(AuthGuard)
  @Get('/text')
  async getAdminText() {
    return this.adminService.getTexts()
  }

  @UseGuards(AuthGuard)
  @Patch('/text')
  async editAdminText(@Body() body: EditTextDto) {
    await this.adminService.editText(body)
    return { status: 'ok' }
  }

  @Get('/health')
  async health() {
    return { status: 'ok' }
  }

  @UseGuards(AuthGuard)
  @Get('/check')
  async check() {
    return { status: 'ok' }
  }
}
