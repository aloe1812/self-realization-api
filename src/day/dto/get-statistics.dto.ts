import { IsNotEmpty, Matches } from 'class-validator';
import { DateRegex, dateFormat } from '../../constants/common';

export class GetStatisticsDto {

  @IsNotEmpty({ message: 'start is required' })
  @Matches(DateRegex, { message: `enter a valid start date in format ${dateFormat}` })
  readonly start: string;

  @IsNotEmpty({ message: 'end is required' })
  @Matches(DateRegex, { message: `enter a valid end date in format ${dateFormat}` })
  readonly end: string;

}
