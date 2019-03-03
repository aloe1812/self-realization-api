import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get('ConfigService') as ConfigService;
  await app.listen(config.port);
}
bootstrap();
