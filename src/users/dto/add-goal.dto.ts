import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { GroupType } from '../../enums/group-type.enum';
import { enumToArray } from '../../utils/common';

export class AddGoalDto {

  @IsNotEmpty({ message: 'type is required' })
  @IsString({ message: 'title must be a string'})
  @IsIn(enumToArray(GroupType), { message: 'type must be one of: mind, body, soul' })
  readonly type: GroupType;

  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string'})
  readonly title: string;

}
