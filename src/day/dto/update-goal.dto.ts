import { IsNotEmpty, IsString, IsMongoId, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateGoalDto {

  @IsNotEmpty({ message: 'dayId is required' })
  @IsMongoId({ message: 'invalid dayId' })
  readonly dayId: string;

  @IsNotEmpty({ message: 'typeId is required' })
  @IsMongoId({ message: 'invalid typeId' })
  readonly typeId: string;

  @IsNotEmpty({ message: 'id is required' })
  @IsMongoId({ message: 'invalid id' })
  readonly id: string;

  @IsOptional()
  @IsString({ message: 'title must be a string'})
  readonly title: string;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'complete must be a number'})
  @Min(0, { message: 'complete must be between 0 and 100' })
  @Max(100, { message: 'complete must be between 0 and 100' })
  readonly complete: number;

}
