import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { LoggerMiddleware } from './middlewares/logger.middelware';
import { GlobalMessageMiddleware } from './middlewares/global-message.middleware';
import { APP_FILTER, APP_GUARD} from '@nestjs/core';
import { HttpFooFilter } from './filters/http-foo.filter';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthorizationService } from './services/authorization.service';
import { RolesService } from './services/roles.service';
import { RolesGuard } from './guards/roles.guard';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    AuthorizationService,
    RolesService,
    // agregando estrategia de manejo de errores
    {
      provide: APP_FILTER,
      useClass: HttpFooFilter,
    },
    // agregando guard de autorización
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    // agregando guard de roles
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ]
})
//agregando los middlewares, debemos implementr NestModule
export class ProductsModule implements NestModule{

  // el metodo configure es donde declaramos todos los middlewares
  configure(consumer: MiddlewareConsumer) {
    consumer
      // los middlewares son ejecutados en el orden que se declaranen .apply(), ojo con eso
      // el orden es importante
      .apply(GlobalMessageMiddleware, LoggerMiddleware)
      .exclude( // excluye rutas a las que no queremos que se les aplique el middleware
        { path: 'api/foo', method: RequestMethod.ALL},
        { path: 'api/foo2', method: RequestMethod.ALL },
        'api/foo3/(.*)', //esta ruta tambien se excluye
      )
      .forRoutes(ProductsController);
  }  
}
