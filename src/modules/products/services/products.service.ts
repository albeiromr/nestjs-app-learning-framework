import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    //injectando el repositorio de product desde la base de datos
    @InjectRepository(Product)
    private usersRepository: Repository<Product>

  ){}
  
  foo1(request: Request): string {
    return `El producto ${request.body.productName} fué creado con exito`;
  }

  async foo2(): Promise<[]>{
    const fetchedData = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await fetchedData.json();
    return data;
  }

  foo3(data: CreateProductDto): string{
    return `Se ha creado el siguiente ${data.productName}, de la marca ${data.productBrand} y precio ${data.price}`;
  }

  foo4(id: number): string {
    return `This action returns a #${id} product`;
  }

  foo5(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  foo6(id: number) {
    return `This action removes a #${id} product`;
  }

  // encontrando todos los registros de la base de datos, tabla de productos
  findAll():Promise<Product[]>{ 
    return this.usersRepository.find();
  }

  // encontrando un solo registro de la base de datos, tabla de productos
  findOne(id: number): Promise<Product | null> {
    return this.usersRepository.findOneBy({ id });
  }

  // eliminar un solo registro de la base de datos, tabla de productos
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
