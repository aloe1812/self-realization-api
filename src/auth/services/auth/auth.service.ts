import { Injectable, BadRequestException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { UsersService } from '../../../users/services/users/users.service';
import { AuthErrors } from '../../enums/auth-errors.enum';
import { SignUserDto } from '../../../users/dto/create-user.dto';
import { User } from '../../../users/interfaces/user.interface';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signUserDto: SignUserDto): Promise<any> {
    const { user, error } = await this.usersService.authenticate(signUserDto);

    if (error) {
      if (this.isAuthError(error)) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }

    return {
      id: user.id,
      username: user.username,
      token: this.createToken(user),
    };
  }

  async signUp(signUserDto: SignUserDto): Promise<any> {
    try {
      const user = await this.usersService.create(signUserDto);

      return {
        id: user.id,
        username: user.username,
        token: this.createToken(user),
      };
    } catch (e) {
      if (this.isAuthError(e)) {
        throw new BadRequestException(e.message);
      }

      throw new InternalServerErrorException();
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByUsername(payload.username);
  }

  private createToken(user: User): string {
    const userPayload: JwtPayload = { username: user.username };
    return this.jwtService.sign(userPayload);
  }

  private isAuthError(e: any) {
    return !!(e && e.name && AuthErrors[e.name]);
  }

}
