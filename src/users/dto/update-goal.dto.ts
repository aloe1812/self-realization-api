import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { AddGoalDto } from './add-goal.dto';
import { ObjectIdRegex } from '../../constants/common';

export class UpdateGoalDto extends AddGoalDto {

  @IsNotEmpty({ message: 'id is required' })
  @IsString({ message: 'id must be a string'})
  @Matches(ObjectIdRegex, { message: 'invalid id' })
  readonly id: string;

}
