import { Controller, Get, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'

import { AuthGuard } from '../guards/auth.guard'
import { ExcelService } from './excel.service'

@UseGuards(AuthGuard)
@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('all_reviews')
  async getExcelAllReviews(@Res() res: Response) {
    const csvBuffer = await this.excelService.getExcelAllReviews()

    res.header('Content-Type', 'text/csv')
    res.header('Content-Disposition', 'attachment; filename="users.csv"')
    res.send(csvBuffer)
  }

  @Get('lottery_numbers')
  async getExcelLotteryNumbers(@Res() res: Response) {
    const csvBuffer = await this.excelService.getExcelLotteryNumbers()

    res.header('Content-Type', 'text/csv')
    res.header('Content-Disposition', 'attachment; filename="users.csv"')
    res.send(csvBuffer)
  }
}
