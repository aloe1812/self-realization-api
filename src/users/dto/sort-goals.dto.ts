import { IsArray, IsNotEmpty, IsString, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { enumToArray } from '../../utils/common';
import { GroupType } from '../../enums/group-type.enum';

export class SortGoalsDto {

  @IsNotEmpty({ message: 'groups is required' })
  @IsArray({ message: 'groups array is expected' })
  @ValidateNested({ each: true })
  @Type(() => GroupDto)
  readonly groups: GroupDto[];

}

// tslint:disable-next-line: max-classes-per-file
export class GroupDto {

  @IsNotEmpty({ message: 'type is required' })
  @IsString({ message: 'title must be a string'})
  @IsIn(enumToArray(GroupType), { message: 'type must be one of: mind, body, soul' })
  readonly type: GroupType;

  @IsNotEmpty({ message: 'goals is required' })
  @IsArray({ message: 'goals array is expected' })
  readonly goals: string[];

}
