import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../guards/auth.guard'
import { AdminService } from './admin.service'

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/sign_in')
  signIn(@Body() body: { login: string; password: string }) {
    return this.adminService.signIn(body)
  }

  @UseGuards(AuthGuard)
  @Get('/text')
  getAdminText() {
    return { getAdminText: 1 }
  }

  @UseGuards(AuthGuard)
  @Patch('/text')
  editAdminText(@Body() body: { text: string }) {
    return this.adminService.create()
  }

  @Get('/health')
  health() {
    return { status: 'ok' }
  }
}
