import { Controller, UseGuards, Get, Req, Query, BadRequestException } from '@nestjs/common';
import { DayService } from './services/day/day.service';
import { AuthGuard } from '@nestjs/passport';
import { GetStatisticsDto } from './dto/get-statistics.dto';
import { Request } from 'express';
import { dateFormat } from '../constants/common';

@Controller('statistics')
@UseGuards(AuthGuard())
export class StatisticsController {

  constructor(
    private readonly dayService: DayService,
  ) { }

  @Get()
  async getStatistics(@Req() request: Request, @Query() getStatisticsDto: GetStatisticsDto) {
    const start = new Date(getStatisticsDto.start);
    const end = new Date(getStatisticsDto.end);

    if (isNaN(start.getTime())) {
      throw new BadRequestException(`enter a valid start date in format ${dateFormat}`);
    }

    if (isNaN(end.getTime())) {
      throw new BadRequestException(`enter a valid end date in format ${dateFormat}`);
    }

    if (end < start) {
      throw new BadRequestException('end date is earlier than start date');
    }

    return await this.dayService.getStatistics(request.user.id, start, end);
  }

}
