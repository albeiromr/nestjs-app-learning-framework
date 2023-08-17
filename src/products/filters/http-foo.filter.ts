import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpFooFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // emulando envío de la información del error a un sistema de almacenamiento de errores
    const newLoggerEntry = {
      status: status,
      data: exception.getResponse(),
      cause: exception.cause
    }
    console.log(newLoggerEntry)
    //-----------------------------------------------------------------


    // al usuario solo le enviaremos datos que no contienen información sensible
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      
  }
}