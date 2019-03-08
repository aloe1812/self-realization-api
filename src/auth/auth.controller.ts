import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { SignUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() signUserDto: SignUserDto) {
    return await this.authService.signIn(signUserDto);
  }

  @Post('signup')
  async signUp(@Body() signUserDto: SignUserDto) {
    return await this.authService.signUp(signUserDto);
  }

}
