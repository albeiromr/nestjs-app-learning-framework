import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthorizationService {

    // valida si en el rquest el token o los roles son validos
    validateRequest(request: Request){
        console.log( request.body)
        return true
    } // si se retorna false el guard no permite consumir el endpoint y arroja un 403
}
