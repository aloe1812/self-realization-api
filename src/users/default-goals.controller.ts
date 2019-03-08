import { Controller, Get, Post, Put, Delete, UseGuards, Req, Body, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DefaultGoalsService } from './services/default-goals/default-goals.service';
import { Request } from 'express';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { AddGoalDto } from './dto/add-goal.dto';
import { DeleteGoalDto } from './dto/delete-goal.dto';
import { SortGoalsDto } from './dto/sort-goals.dto';

@Controller('user/default-goals')
@UseGuards(AuthGuard())
export class DefaultGoalsController {

  constructor(
    private readonly defaultGoalsService: DefaultGoalsService,
  ) { }

  @Get()
  async getAllGoals(@Req() request: Request) {
    return await this.defaultGoalsService.getAll(request.user._id);
  }

  @Put()
  @HttpCode(201)
  async addGoal(@Req() request: Request, @Body() addGoalDto: AddGoalDto) {
    return await this.defaultGoalsService.addGoal(request.user._id, addGoalDto.title);
  }

  @Post()
  @HttpCode(200)
  async updateGoal(@Req() request: Request, @Body() updateGoalDto: UpdateGoalDto) {
    return await this.defaultGoalsService.updateGoal(request.user._id, updateGoalDto);
  }

  @Delete()
  async deleteGoal(@Req() request: Request, @Body() deleteGoalId: DeleteGoalDto) {
    return await this.defaultGoalsService.deleteGoal(request.user._id, deleteGoalId.id);
  }

  @Post('sort')
  @HttpCode(200)
  async sortGoals(@Req() request: Request, @Body() sortGoalsDto: SortGoalsDto) {
    const goals = sortGoalsDto.goals.filter(g => typeof g === 'string');

    if (!goals.length) {
      return;
    }

    return await this.defaultGoalsService.sortGoals(request.user._id, goals);
  }

}
