import { IsString, MinLength, IsNotEmpty, MaxLength } from 'class-validator';

export class SignUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @IsString({ message: 'valid username is required' })
  @MaxLength(100, { message: 'username is too long, must be less than 100 characters' })
  readonly username: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'valid password is required' })
  @MinLength(5, { message: 'password must be of minimum 5 characters length' })
  @MaxLength(100, { message: 'password is too long, must be less than 100 characters' })
  readonly password: string;
}
