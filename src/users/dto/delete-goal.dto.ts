import { IsNotEmpty, IsMongoId } from 'class-validator';

export class DeleteGoalDto {

  @IsNotEmpty({ message: 'typeId is required' })
  @IsMongoId({ message: 'invalid typeId' })
  readonly typeId: string;

  @IsNotEmpty({ message: 'id is required' })
  @IsMongoId({ message: 'invalid id' })
  readonly id: string;

}
