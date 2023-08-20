import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Header, Redirect, Query, HttpException, HttpStatus, UseFilters, ParseIntPipe, ParseFloatPipe } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Request } from 'express';
import { FindOneParams } from '../params/find-one.params';
import { UpdateParams } from '../params/update.params';
import { Roles } from '../../../decorators/roles.decorator';
import { DeleteOneParams } from '../params/delete-one.params';
import { ConfigService } from '@nestjs/config';
import { ConfigurationModel } from '../../../config/configuration.model';

@Controller({host: "localhost", path: 'api/products'}) // solo se responderan solicitudes de "localhost"
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService
  ) { }

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

  // ejemplo de update con validación de un DTO hecho solo para updates y validación de params
  @Patch(':id')
  update(@Param() updateParams: UpdateParams, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.foo5(updateParams.id, updateProductDto);
  }

  // ejemplo de delete con validación de roles usando un guard
  @Delete(':id')
  @Roles('admin') // el guard de roles solo permitira a los request que traigan este role acceder al handler
  remove(@Param() deleteOneParams: DeleteOneParams) {
    return this.productsService.foo6(deleteOneParams.id);
  }

  //Ejemplo de Post con acceso a variables de entorno
  @Post('show-environment-variables')
  handleShowEnvironmentVariables(){
    const jwtConfig: ConfigurationModel['jwt'] = this.configService.get<ConfigurationModel['jwt']>('jwt');
    return jwtConfig;
  }
}
