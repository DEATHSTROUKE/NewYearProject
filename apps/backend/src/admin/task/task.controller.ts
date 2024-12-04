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
import { CreateTaskDto, UpdateTaskDto } from '../types/task.dto'
import { TaskService } from './task.service'

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll() {
    return await this.taskService.findAll()
  }

  @Post()
  async create(@Body() task: CreateTaskDto) {
    return await this.taskService.create(task)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    await this.taskService.update(id, task)
    return { status: 'ok' }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.taskService.remove(id)
    return { status: 'ok' }
  }
}
