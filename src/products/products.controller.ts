import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Header, Redirect, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';

@Controller({host: "localhost", path: 'api/products'}) // solo se responderan solicitudes de "localhost"
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Header('Cache-Control', 'none') // agrega un header adicional a la respuesta
  @Header('otro-header', 'valor-otro-header') // agrega un header adicional a la respuesta
  createProduct(@Req() request: Request, @Body() createProductDto: CreateProductDto) {
    if (request.hostname === "localhost") return this.productsService.create(request, createProductDto);
    else return "host no valido"
  }

  @Get("redirect")
  @Redirect() // indica que la ruta realizará una redirección
  RedirectUser() {
    return { url: "https://docs.nestjs.com", statusCode: 301} // indica la url y código de la retirección
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
