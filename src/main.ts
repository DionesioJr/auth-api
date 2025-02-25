import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { ResponseMiddleware } from './middleware/response.middleware';

async function bootstrap() {
  // Carregar o arquivo .env
  config();

  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);

  // Aplica o interceptor globalmente
  app.useGlobalInterceptors(new ResponseMiddleware());

  // Habilitar transformação e validação global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Usar a porta definida no .env ou a porta padrão 8000
  const port = process.env.APP_PORT || 8001;
  logger.log(`Server running on port ${port}`);
  await app.listen(port);
}

void bootstrap();
