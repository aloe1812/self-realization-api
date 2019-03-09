import { IsNotEmpty, IsString, IsIn, IsMongoId, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { enumToArray } from '../../utils/common';
import { GroupType } from '../../enums/group-type.enum';

export class DeleteGoalDto {

  @IsNotEmpty({ message: 'dayId is required' })
  @IsString({ message: 'dayId must be a string'})
  @IsMongoId({ message: 'invalid dayId' })
  readonly dayId: string;

  @IsNotEmpty({ message: 'id is required' })
  @IsString({ message: 'id must be a string'})
  @IsMongoId({ message: 'invalid id' })
  readonly id: string;

  @IsNotEmpty({ message: 'type is required' })
  @IsString({ message: 'type must be a string'})
  @IsIn(enumToArray(GroupType), { message: 'type must be one of: mind, body, soul' })
  readonly type: GroupType;

}
