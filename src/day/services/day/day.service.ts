import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Day } from '../../interfaces/day.interface';

@Injectable()
export class DayService {

  constructor(
    @InjectModel('Day') private readonly dayModel: Model<Day>,
  ) {}

  async createDay(userId: string, date = new Date()) {
    const day = new this.dayModel({ userId, date });
    await day.save();
    return day;
  }

}
