import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


// este interceptor se usa para ejecutar lógica antes y después de que se ejecute
// el handler de una ruta, en este caso lo usamos para tomar el tiempo que el handler
// toma en ejecutarse y logueamos ese tiempo en consola.

// si una exepción es lanzada desde el handler, la lógica que se ejecuta después del handler
// ya no se ejecutará

// los interceptors también sirven para mutar la respuesta que el handler retorna y enviar la 
// respuesta mutada al usuario

// documentación de los interceptor en https://docs.nestjs.com/interceptors
@Injectable()
export class LogInteractionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Antes de ejecutar el handler de la ruta....');

    const now = Date.now();
    return next
      .handle() // ejecutando el handler de la ruta con .handle()
      .pipe( // subscribiendose al ciclo de vida del handler con .pipe(), en este caso cuando el handler termina
        tap(() => console.log(`Después de ejecutar el handler de la ruta.... ${Date.now() - now}ms`)),
    );
  }
}