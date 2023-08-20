import { IsString, IsInt } from 'class-validator';

// mas información a cerca de los decoradores de class validator aquí:
// https://github.com/typestack/class-validator#usage
export class CreateProductDto {

    @IsString()
    productName: string

    @IsString()
    productBrand: string

    @IsInt()
    price: number
}
