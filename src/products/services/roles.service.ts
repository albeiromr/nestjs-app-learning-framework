import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {

    matchRoles(requiredRoles: string[], userRoles: string []): boolean {
        // la lógica de comparación de roles va aquí

        return true // si se retorna false el guard no permite consumir el endpoint y arroja un 403
    }
}
