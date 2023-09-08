import { NestFactory } from '@nestjs/core';
import { NotFoundException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaModel } from './prisma/models';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const config = new DocumentBuilder()
    .setTitle('Book Rental API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [...PrismaModel.extraModels]
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
