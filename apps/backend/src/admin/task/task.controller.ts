import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'

import { AuthGuard } from '../guards/auth.guard'
import { TaskService } from './task.service'

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @Post()
  // async create(@Body() task: Task) {
  //   return await this.taskService.create(task)
  // }

  // @Get()
  // async findAll() {
  //   return await this.taskService.findAll()
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.taskService.findOne(id)
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() task: Task) {
  //   return await this.taskService.update(id, task)
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.taskService.remove(id)
  // }
}
