import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { DefaultGroupsService } from './services/default-groups/default-groups.service';
import { DefaultGroupsController } from './default-groups.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService, DefaultGroupsService],
  exports: [UsersService],
  controllers: [DefaultGroupsController],
})
export class UsersModule {}
