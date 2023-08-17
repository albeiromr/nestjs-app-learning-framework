import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { LoggerMiddleware } from './middlewares/logger.middelware';
import { GlobalMessageMiddleware } from './middlewares/global-message.middleware';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
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
