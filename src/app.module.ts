import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config/config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DayModule } from './day/day.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.mongodbUri,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    DayModule,
  ],
})
export class AppModule {}
