import { IsNotEmpty, Matches } from 'class-validator';
import { DateRegex } from '../../constants/common';

export class GetDayDto {

  @IsNotEmpty({ message: 'date is required' })
  @Matches(DateRegex, { message: 'enter a valid date in format YYYY-MM-DD' })
  readonly date: string;

}
