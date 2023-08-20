import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { GlobalMessageMiddleware } from './products/middlewares/global-message.middleware';
import { LoggerMiddleware } from './products/middlewares/logger.middelware';
import { ProductsController } from './products/controllers/products.controller';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthorizationGuard } from './products/guards/authorization.guard';
import { RolesGuard } from './products/guards/roles.guard';
import { HttpFooFilter } from './products/filters/http-foo.filter';
import { LogInteractionInterceptor } from './products/Interceptors/log-interaction.interceptor';
import { TimeoutInterceptor } from './products/Interceptors/timeout.interceptor';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './products/config/configuration';
import { validationSchema } from './products/config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';

@Module({
    imports: [
        ProductsModule
    ]
})
export class AppModule implements NestModule {

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
