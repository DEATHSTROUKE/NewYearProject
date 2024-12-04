import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import { DatabaseModule } from '../database/database.module'
import { ExcelController } from './excel/excel.controller'
import { ExcelService } from './excel/excel.service'
import { AdminController } from './main/admin.controller'
import { AdminService } from './main/admin.service'
import { TaskController } from './task/task.controller'
import { TaskService } from './task/task.service'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'

export const JWT_SECRET = process.env.JWT_SECRET
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    DatabaseModule,
  ],
  controllers: [
    AdminController,
    TaskController,
    UserController,
    ExcelController,
  ],
  providers: [AdminService, TaskService, ExcelService, UserService],
})
export class AdminModule {}
