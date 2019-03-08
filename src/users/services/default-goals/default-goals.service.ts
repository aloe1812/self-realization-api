import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../../interfaces/user.interface';
import { UpdateGoalDto } from '../../dto/update-goal.dto';

@Injectable()
export class DefaultGoalsService {

  constructor(
    @InjectModel('User') private readonly userModel: UserModel,
  ) {}

  async getAll(userId: string) {
    const user = await this.userModel.findById(userId, 'goals._id goals.title');
    return user.goals || [];
  }

  async addGoal(userId: string, title: string) {
    const user = await this.userModel.findById(userId, 'goals');
    user.goals.push({ title });
    user.save();
  }

  async updateGoal(userId: string, updateGoalDto: UpdateGoalDto) {
    const user = await this.userModel.findById(userId, 'goals');
    const goal = user.goals.id(updateGoalDto.id);

    if (!goal) {
      throw new NotFoundException('Goal with such id does not exist');
    }

    goal.title = updateGoalDto.title;
    user.save();
  }

  async deleteGoal(userId: string, goalId: string) {
    const user = await this.userModel.findById(userId, 'goals');
    user.goals.pull(goalId);
    user.save();
  }

  async sortGoals(userId: string, goals: string[]) {
    const user = await this.userModel.findById(userId, 'goals');

    user.goals.sort((a, b) => {
      const indexA = goals.indexOf(a.id);
      const indexB = goals.indexOf(b.id);

      if (indexA === -1 && indexB === -1) { // both not found, we don't care which comes first
        return 0;
      }

      if (indexA === -1) { // a not found, then it should have greater index than b
        return 1;
      }

      if (indexB === -1) { // b not found, then it should have greater index than a
        return -1;
      }

      return indexA < indexB ? -1 : 1;
    });

    user.save();
  }

}
