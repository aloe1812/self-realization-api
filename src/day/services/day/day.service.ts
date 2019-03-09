import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Day } from '../../interfaces/day.interface';
import { DefaultGroupsService } from '../../../users/services/default-groups/default-groups.service';
import { AddGoalDto } from '../../dto/add-goal.dto';
import { UpdateGoalDto } from '../../dto/update-goal.dto';
import { DeleteGoalDto } from '../../dto/delete-goal.dto';
import { GroupType } from '../../../enums/group-type.enum';
import { SortGoalsDto } from '../../dto/sort-goals.dto';
import { sortGroupsCompareFn } from '../../../utils/common';

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

  async addGoal(userId: string, addGoalDto: AddGoalDto) {
    const { day, group } = await this.getDayData(userId, addGoalDto.dayId, addGoalDto.typeId);

    group.goals.push({ title: addGoalDto.title });

    const savedDay = await day.save();
    return this.updatedGoalResponse(savedDay, addGoalDto.typeId);
  }

  async updateGoal(userId: string, updateGoalDto: UpdateGoalDto) {
    const { day, group } = await this.getDayData(userId, updateGoalDto.dayId, updateGoalDto.typeId);

    const goal = group.goals.id(updateGoalDto.id);

    if (!goal) {
      throw new NotFoundException('group with such id does not exist');
    }

    if (updateGoalDto.title) {
      goal.title = updateGoalDto.title;
    }

    if (updateGoalDto.complete) {
      goal.complete = updateGoalDto.complete;
    }

    const savedDay = await day.save();
    return this.updatedGoalResponse(savedDay, updateGoalDto.typeId);
  }

  async deleteGoal(userId: string, deleteGoalDto: DeleteGoalDto) {
    const { day, group } = await this.getDayData(userId, deleteGoalDto.dayId, deleteGoalDto.typeId);
    group.goals.pull(deleteGoalDto.id);

    const savedDay = await day.save();
    return this.updatedGoalResponse(savedDay, deleteGoalDto.typeId);
  }

  async sortGoals(userId: string, sortGoalsDto: SortGoalsDto) {
    const day = await this.dayModel.findOne({ _id: sortGoalsDto.dayId, userId });

    sortGoalsDto.groups.forEach(groupDto => {
      const group = day.groups.id(groupDto.typeId);

      if (!group) {
        return;
      }

      group.goals.sort(sortGroupsCompareFn(groupDto));
    });

    await day.save();
  }

  private async getDayData(userId: string, dayId: string, groupTypeId: string) {
    const day = await this.dayModel.findOne({ _id: dayId, userId });

    if (!day) {
      throw new NotFoundException('day with such id does not exist');
    }

    const group = day.groups.id(groupTypeId);

    if (!group) {
      throw new NotFoundException('group with such type does not exist');
    }

    return { day, group };
  }

  private updatedGoalResponse(day: Day, groupTypeId: string) {
    const savedGroup = day.groups.id(groupTypeId);
    const savedGoal = savedGroup.goals[savedGroup.goals.length - 1];

    return {
      goal: savedGoal,
      day: {
        complete: day.complete,
      },
      group: {
        type: savedGroup.type,
        complete: savedGroup.complete,
      },
    };
  }

}
