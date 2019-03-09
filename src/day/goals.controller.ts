import { Controller, UseGuards, Put, HttpCode, Req, Body, Post, Delete } from '@nestjs/common';
import { DayService } from './services/day/day.service';
import { AuthGuard } from '@nestjs/passport';
import { AddGoalDto } from './dto/add-goal.dto';
import { Request } from 'express';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { DeleteGoalDto } from './dto/delete-goal.dto';
import { SortGoalsDto } from './dto/sort-goals.dto';

@Controller('day/goals')
@UseGuards(AuthGuard())
export class GoalsController {

  constructor(
    private readonly dayService: DayService,
  ) { }

  @Put()
  @HttpCode(201)
  async addGoal(@Req() request: Request, @Body() addGoalDto: AddGoalDto) {
    return await this.dayService.addGoal(request.user.id, addGoalDto);
  }

  @Post()
  @HttpCode(200)
  async updateGoal(@Req() request: Request, @Body() updateGoalDto: UpdateGoalDto) {
    return await this.dayService.updateGoal(request.user._id, updateGoalDto);
  }

  @Delete()
  async deleteGoal(@Req() request: Request, @Body() deleteGoalDto: DeleteGoalDto) {
    const result = await this.dayService.deleteGoal(request.user._id, deleteGoalDto);

    return {
      day: result.day,
      group: result.group,
    };
  }

  @Post('sort')
  @HttpCode(200)
  async sortGoals(@Req() request: Request, @Body() sortGoalsDto: SortGoalsDto) {
    if (!sortGoalsDto.groups.length) {
      return;
    }

    return await this.dayService.sortGoals(request.user._id, sortGoalsDto);
  }

}
