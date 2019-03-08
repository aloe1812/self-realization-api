import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../interfaces/user.interface';
import { SignUserDto } from '../../dto/create-user.dto';
import { UserModel } from '../../interfaces/user.interface';
import { AuthenticationResult } from 'mongoose';

@Injectable()
export class UsersService {

  private authenticateUser: (username: string, password: string) => Promise<AuthenticationResult> = this.userModel.authenticate();

  constructor(
    @InjectModel('User') private readonly userModel: UserModel,
  ) {}

  async create(signUserDto: SignUserDto): Promise<User> {
    const { username, password } = signUserDto;
    return await this.userModel.register(new this.userModel({ username }), password);
  }

  async authenticate(signUserDto: SignUserDto) {
    const { username, password } = signUserDto;
    return await this.authenticateUser(username, password);
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

}
