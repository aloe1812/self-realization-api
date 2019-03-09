import { IsNotEmpty, IsString, IsIn, IsMongoId } from 'class-validator';
import { enumToArray } from '../../utils/common';
import { GroupType } from '../../enums/group-type.enum';

export class DeleteGoalDto {

  @IsNotEmpty({ message: 'type is required' })
  @IsString({ message: 'title must be a string'})
  @IsIn(enumToArray(GroupType), { message: 'type must be one of: mind, body, soul' })
  readonly type: GroupType;

  @IsNotEmpty({ message: 'id is required' })
  @IsString({ message: 'id must be a string'})
  @IsMongoId({ message: 'invalid id' })
  readonly id: string;

}
