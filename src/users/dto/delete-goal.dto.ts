import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ObjectIdRegex } from '../../constants/common';

export class DeleteGoalDto {

  @IsNotEmpty({ message: 'id is required' })
  @IsString({ message: 'id must be a string'})
  @Matches(ObjectIdRegex, { message: 'invalid id' })
  readonly id: string;

}
