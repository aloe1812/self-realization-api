import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, validationError: { target: false, value: false}}));
  const config = app.get('ConfigService') as ConfigService;
  await app.listen(config.port);
}
bootstrap();
