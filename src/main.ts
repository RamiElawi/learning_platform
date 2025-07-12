import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './swagger/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1') 
  app.enableCors({
    origin:'*',
    methods:'GET,PUT,PATCH,POST,DELETE,HEAD,OPTIONS',
    Credential:true,
    allowedHeaders:'Content-Type,Accept,Authorization,X-Requested-With,'
  })
  SwaggerModule.setup('api',app,createDocument(app))
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
