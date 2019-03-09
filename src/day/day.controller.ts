import { Controller, UseGuards, Get, Query, Req, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetDayDto } from './dto/get-day.dto';
import { DayService } from './services/day/day.service';
import { Request } from 'express';
import { dateFormat } from '../constants/common';

@Controller('day')
@UseGuards(AuthGuard())
export class DayController {

  constructor(
    private readonly dayService: DayService,
  ) { }

  @Get()
  async getDay(@Req() request: Request, @Query() getDayDto: GetDayDto) {
    const date = new Date(getDayDto.date);

    if (isNaN(date.getTime())) {
      throw new BadRequestException(`enter a valid date in format ${dateFormat}`);
    }

    let day = await this.dayService.findDayByDate(request.user.id, date);

    if (!day) {
      day = await this.dayService.createDay(request.user.id, date);
    }

    return day;
  }

}
