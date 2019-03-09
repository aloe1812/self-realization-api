import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Day } from '../../interfaces/day.interface';
import { DefaultGroupsService } from '../../../users/services/default-groups/default-groups.service';

@Injectable()
export class DayService {

  constructor(
    @InjectModel('Day') private readonly dayModel: Model<Day>,
    private readonly defaultGroupsService: DefaultGroupsService,
  ) {}

  async createDay(userId: string, date?: Date) {
    if (!date) {
      date = new Date();
      date.setHours(0, 0, 0, 0);
    }

    const day = new this.dayModel({ userId, date });
    const defaultGroups = await this.defaultGroupsService.getAll(userId);

    defaultGroups.forEach(group => {
      day.groups.push(group);
    });

    await day.save();
    return day;
  }

  async findDayByDate(userId: string, date: Date) {
    return await this.dayModel.findOne({ userId, date });
  }

}
