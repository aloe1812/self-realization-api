import { Controller, Post, Body, HttpCode, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { SignUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

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

  @Get('me')
  @UseGuards(AuthGuard())
  async getMe(@Req() request: Request) {
    return {
      id: request.user.id,
      username: request.user.username,
    };
  }

}
