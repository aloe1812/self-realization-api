import { IsArray, IsNotEmpty } from 'class-validator';

export class SortGoalsDto {

  @IsNotEmpty({ message: 'goals is required' })
  @IsArray({ message: 'goals array is expected' })
  readonly goals: string[];

}
