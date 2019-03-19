import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, validationError: { target: false, value: false}}));
  const config = app.get('ConfigService') as ConfigService;

  // security
  app.use(helmet());
  app.enableCors();

  // optimization
  app.use(compression());

  await app.listen(config.port);
}
bootstrap();
