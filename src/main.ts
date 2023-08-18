import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);

  // global validation pipe, valida dtos, params y tipos de datos declarados en las firmas de los handlers
  app.useGlobalPipes( new ValidationPipe({
      //  elimina cualquier campo adicional que no deba ir en los campos de los dto o params
      whitelist: true, 

      // detiene la petición y lanza una excepción si hay campos que no deban ir en los dto o params
      forbidNonWhitelisted: true, 

      // toma los objetos o variables del request y les asigna el tipado correspondiente a su archivo de dto,
      // params u otro tipo de dato que hallamos declarado en la firma del handler
      transform: true, 
  }));

  await app.listen(3000);
}
bootstrap();
