import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

async function bootstrap() {
  // Carregar o arquivo .env
  config();

  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);

  // Habilitar transformação e validação global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Configurar Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for users')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Usar a porta definida no .env ou a porta padrão 8000
  const port = process.env.APP_PORT || 3000;
  logger.log(`Server running on port ${port}`);
  await app.listen(port);
}

void bootstrap();
