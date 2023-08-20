import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
// los middlewares también pueden ser funciones como lo dice la documentación, sin embargo
// si los middlewares van a consumir deppendencias es mejor una clase
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }

}
