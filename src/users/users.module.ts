import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { DefaultGoalsService } from './services/default-goals/default-goals.service';
import { DefaultGoalsController } from './default-goals.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService, DefaultGoalsService],
  exports: [UsersService],
  controllers: [DefaultGoalsController],
})
export class UsersModule {}
