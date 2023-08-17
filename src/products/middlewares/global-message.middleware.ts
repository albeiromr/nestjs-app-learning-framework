import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GlobalMessageMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request... lisented up fou global middleware');
    next();
  }

}
