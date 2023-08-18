import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Header, Redirect, Query, HttpException, HttpStatus, UseFilters, ParseIntPipe, ParseFloatPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';
import { HttpFooFilter } from './filters/http-foo.filter';
import { FindOneParams } from './params/find-one.params';

@Controller({host: "localhost", path: 'api/products'}) // solo se responderan solicitudes de "localhost"
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  // ejemplo de endpoint post con headers y acceso al request
  @Post("headers-example")
  @Header('Cache-Control', 'none') // agrega un header adicional a la respuesta
  @Header('otro-header', 'valor-otro-header') // agrega un header adicional a la respuesta
  handleHeadersExample(@Req() request: Request) {
    if (request.hostname === "localhost") return this.productsService.foo1(request);
    else return "host no valido";
  }

  // ejemlo de endpoint get con petición asyncrona con async y await
  @Get("get-async-data")
  async handleGetAsyncData(): Promise<[]> {
    const data = await this.productsService.foo2();
    return data;
  }

  //ejemplo de redirección
  @Get("redirect")
  @Redirect() // indica que la ruta realizará una redirección
  handleRedirect() {
    return { url: "https://docs.nestjs.com", statusCode: 301}; // indica la url y código de la retirección
  }

  // ejemplo de get que lanza un error por algun motvo
  @Get("throw-error")
  handleThrowError(){
    // enviar siempre los errores usando la clase HttpExeption o una clase que herede de ella y HttpStatus
    // ver documentación https://docs.nestjs.com/exception-filters
    // ojo!! también hay exeptions que ya vienen creados, ver documentación
    throw new HttpException(
      {
        message: "forbidden", 
        otherData: "other data...",
        otherDatatwo: "other data 2..."
      },
      HttpStatus.FORBIDDEN,
      {
        cause: new Error("este fué el error")
      }
    );
  }


  // ejemplo con implementación de un pipe, los pipes se ejecutan antes que el handler
  // existen muchos mas pipes de validación, ver documentación: https://docs.nestjs.com/pipes

  // ejemplo de validación de los parámetros mediante el pipe ValidationPipe y class-validator
  // leer documentación: https://docs.nestjs.com/pipes#class-validator
  // leer también: https://docs.nestjs.com/techniques/validation
  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.productsService.foo4(params.id);
  }


  // ejemplo de validación del body mediante el pipe ValidationPipe y class-validator
  // leer documentación: https://docs.nestjs.com/pipes#class-validator
  // leer también: https://docs.nestjs.com/techniques/validation
  @Post("create-product")
  handleCreateProduct(@Body() createProductDto: CreateProductDto){
    const result = this.productsService.foo3(createProductDto);
    return result;
  }



  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  } */



  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  } */
}
