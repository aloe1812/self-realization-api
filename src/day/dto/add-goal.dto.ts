import { IsNotEmpty, IsString, IsMongoId, MaxLength } from 'class-validator';

export class AddGoalDto {

  @IsNotEmpty({ message: 'dayId is required' })
  @IsMongoId({ message: 'invalid dayId' })
  readonly dayId: string;

  @IsNotEmpty({ message: 'typeId is required' })
  @IsMongoId({ message: 'invalid typeId' })
  readonly typeId: string;

  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string'})
  @MaxLength(500, { message: 'title length must be equal or less than 500' })
  readonly title: string;

}
