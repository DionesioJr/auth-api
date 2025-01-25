import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar transformação e validação global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma as strings em objetos Date automaticamente
      whitelist: true, // Remove propriedades não especificadas no DTO
      forbidNonWhitelisted: true, // Gera erro para propriedades não especificadas
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for users')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
