import { IsNotEmpty, IsString } from 'class-validator';

export class AddGoalDto {

  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string'})
  readonly title: string;

}
