import { IsArray, IsNotEmpty, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class SortGoalsDto {

  @IsNotEmpty({ message: 'dayId is required' })
  @IsMongoId({ message: 'invalid dayId' })
  readonly dayId: string;

  @IsNotEmpty({ message: 'groups is required' })
  @IsArray({ message: 'groups array is expected' })
  @ValidateNested({ each: true })
  @Type(() => GroupDto)
  readonly groups: GroupDto[];

}

// tslint:disable-next-line: max-classes-per-file
export class GroupDto {

  @IsNotEmpty({ message: 'typeId is required' })
  @IsMongoId({ message: 'invalid typeId' })
  readonly typeId: string;

  @IsNotEmpty({ message: 'goals is required' })
  @IsArray({ message: 'goals array is expected' })
  readonly goals: string[];

}
