import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Header, Redirect, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';

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


  @Post("create-product")
  handleCreateProduct(@Body() createProductDto: CreateProductDto){
    const result = this.productsService.foo3(createProductDto);
    return result;
  }


  //ejemplo de redirección
  @Get("redirect")
  @Redirect() // indica que la ruta realizará una redirección
  handleRedirect() {
    return { url: "https://docs.nestjs.com", statusCode: 301}; // indica la url y código de la retirección
  }


  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  } */



  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  } */



  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  } */
}
