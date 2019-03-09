import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { AddGoalDto } from './add-goal.dto';

export class UpdateGoalDto extends AddGoalDto {

  @IsNotEmpty({ message: 'id is required' })
  @IsString({ message: 'id must be a string'})
  @IsMongoId({ message: 'invalid id' })
  readonly id: string;

}
