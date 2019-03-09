import { IsNotEmpty, Matches } from 'class-validator';
import { DateRegex, dateFormat } from '../../constants/common';

export class GetDayDto {

  @IsNotEmpty({ message: 'date is required' })
  @Matches(DateRegex, { message: `enter a valid date in format ${dateFormat}` })
  readonly date: string;

}
