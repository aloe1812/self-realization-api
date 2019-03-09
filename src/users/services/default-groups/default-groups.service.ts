import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../../interfaces/user.interface';
import { UpdateGoalDto } from '../../dto/update-goal.dto';
import { AddGoalDto } from '../../dto/add-goal.dto';
import { DeleteGoalDto } from '../../dto/delete-goal.dto';
import { GroupType } from '../../../enums/group-type.enum';
import { SortGoalsDto } from '../../dto/sort-goals.dto';
import { sortGroupsCompareFn } from '../../../utils/common';

@Injectable()
export class DefaultGroupsService {

  constructor(
    @InjectModel('User') private readonly userModel: UserModel,
  ) {}

  async getAll(userId: string) {
    const user = await this.userModel.findById(userId, 'groups.type groups.goals');
    return user.groups || [];
  }

  async addGoal(userId: string, addGoalDto: AddGoalDto) {
    const result = await this.findUserAndGroup(userId, addGoalDto.type, false);

    const { user } = result;
    let { group } = result;

    if (!group) {
      user.groups.push({
        type: addGoalDto.type,
        goals: [],
      });
      group = user.groups[user.groups.length - 1];
    }

    group.goals.push({ title: addGoalDto.title });
    await user.save();

    return group.goals[group.goals.length - 1];
  }

  async updateGoal(userId: string, updateGoalDto: UpdateGoalDto) {
    const { user, group } = await this.findUserAndGroup(userId, updateGoalDto.type);
    const goal = group.goals.id(updateGoalDto.id);

    if (!goal) {
      throw new NotFoundException('goal with such id does not exist');
    }

    goal.title = updateGoalDto.title;
    await user.save();
  }

  async deleteGoal(userId: string, deleteGoalDto: DeleteGoalDto) {
    const { user, group } = await this.findUserAndGroup(userId, deleteGoalDto.type);

    if (!group) {
      throw new NotFoundException('goal with such id does not exist');
    }

    group.goals.pull(deleteGoalDto.id);
    await user.save();
  }

  async sortGoals(userId: string, sortGoalsDto: SortGoalsDto) {
    const user = await this.userModel.findById(userId, 'groups');

    sortGoalsDto.groups.forEach(groupDto => {
      const group = user.groups.find(g => g.type === groupDto.type);

      if (!group) {
        return;
      }

      group.goals.sort(sortGroupsCompareFn(groupDto));
    });

    await user.save();
  }

  private async findUserAndGroup(userId: string, groupType: GroupType, shouldThrowError = true) {
    const user = await this.userModel.findById(userId, 'groups');
    const group = user.groups.find(g => g.type === groupType);

    if (shouldThrowError && !group) {
      throw new NotFoundException('goal with such id does not exist');
    }

    return { user, group };
  }

}
