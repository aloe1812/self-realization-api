import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class SignUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @IsString({ message: 'valid username is required' })
  readonly username: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'valid password is required' })
  @MinLength(5, { message: 'password must be of minimum 5 characters length' })
  readonly password: string;
}
