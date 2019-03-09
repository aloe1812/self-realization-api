import { IsNotEmpty, IsString, IsIn, IsMongoId } from 'class-validator';
import { enumToArray } from '../../utils/common';
import { GroupType } from '../../enums/group-type.enum';

export class AddGoalDto {

  @IsNotEmpty({ message: 'dayId is required' })
  @IsString({ message: 'dayId must be a string'})
  @IsMongoId({ message: 'invalid dayId' })
  readonly dayId: string;

  @IsNotEmpty({ message: 'type is required' })
  @IsString({ message: 'type must be a string'})
  @IsIn(enumToArray(GroupType), { message: 'type must be one of: mind, body, soul' })
  readonly type: GroupType;

  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string'})
  readonly title: string;

}
