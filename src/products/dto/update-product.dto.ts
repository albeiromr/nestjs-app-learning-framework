import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';


// los DTO para hacer update de entidades se crean usando las funciones que vienen de
// @nestjs/mapped-types, hay varias formas de trabajar con esta funciones para obtener
// flexibilidad o total restriccipon en la validación del DTO.
// para ver la documentación de mapped-types se puede consultar este link
// https://docs.nestjs.com/techniques/validation#mapped-types
export class UpdateProductDto extends PartialType(CreateProductDto) {}
