import { Controller, Get, Post, Put, Delete, UseGuards, Req, Body, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DefaultGroupsService } from './services/default-groups/default-groups.service';
import { Request } from 'express';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { AddGoalDto } from './dto/add-goal.dto';
import { DeleteGoalDto } from './dto/delete-goal.dto';
import { SortGoalsDto } from './dto/sort-goals.dto';

@Controller('user/default-groups')
@UseGuards(AuthGuard())
export class DefaultGroupsController {

  constructor(
    private readonly defaultGroupsService: DefaultGroupsService,
  ) { }

  @Get()
  async getAllGroups(@Req() request: Request) {
    return await this.defaultGroupsService.getAll(request.user._id);
  }

  @Put('goals')
  @HttpCode(201)
  async addGoal(@Req() request: Request, @Body() addGoalDto: AddGoalDto) {
    return await this.defaultGroupsService.addGoal(request.user._id, addGoalDto);
  }

  @Post('goals')
  @HttpCode(200)
  async updateGoal(@Req() request: Request, @Body() updateGoalDto: UpdateGoalDto) {
    return await this.defaultGroupsService.updateGoal(request.user._id, updateGoalDto);
  }

  @Delete('goals')
  async deleteGoal(@Req() request: Request, @Body() deleteGoalDto: DeleteGoalDto) {
    return await this.defaultGroupsService.deleteGoal(request.user._id, deleteGoalDto);
  }

  @Post('goals/sort')
  @HttpCode(200)
  async sortGoals(@Req() request: Request, @Body() sortGoalsDto: SortGoalsDto) {
    if (!sortGoalsDto.groups.length) {
      return;
    }

    return await this.defaultGroupsService.sortGoals(request.user._id, sortGoalsDto);
  }

}
