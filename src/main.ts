import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Litoplas API')
    .setDescription('This is our first doc for litoplas api')
    .setVersion('1.0')
    .addTag('Litoplas')
    .build();
  
  const document2 = SwaggerModule.createDocument(app, config) ;
  SwaggerModule.setup('api/docs', app, document2, {
    explorer: true,
    swaggerOptions:{
      filter: true,
      showRequestDuration: true
    }
  });

  const config2 = new DocumentBuilder()
  .setTitle('Litoplas API V2')
  .setDescription('This is our first doc for litoplas api')
  .setVersion('2.0')
  .addTag('Litoplas')
  .build();

  const document = SwaggerModule.createDocument(app, config2) ;
  SwaggerModule.setup('api/docs/v2', app, document, {
    explorer: true,
    swaggerOptions:{
      filter: true,
      showRequestDuration: true
    }
  });

  await app.listen(3000);
}
bootstrap();
