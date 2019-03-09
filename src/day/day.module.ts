import { Module } from '@nestjs/common';
import { DayController } from './day.controller';
import { DayService } from './services/day/day.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { GoalsController } from './goals.controller';
import { StatisticsController } from './statistics.controller';
import DaySchema from './schemas/day.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'Day', schema: DaySchema }]),
    UsersModule,
  ],
  controllers: [DayController, GoalsController, StatisticsController],
  providers: [DayService],
})
export class DayModule {}
