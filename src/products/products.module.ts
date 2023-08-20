import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { LoggerMiddleware } from './middlewares/logger.middelware';
import { GlobalMessageMiddleware } from './middlewares/global-message.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import { HttpFooFilter } from './filters/http-foo.filter';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthorizationService } from './services/authorization.service';
import { RolesService } from './services/roles.service';
import { RolesGuard } from './guards/roles.guard';
import { LogInteractionInterceptor } from './Interceptors/log-interaction.interceptor';
import { TimeoutInterceptor } from './Interceptors/timeout.interceptor';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    
  ],
  controllers: [
    ProductsController
  ],
  providers: [
    ProductsService,
    AuthorizationService,
    RolesService,
  ], 
  exports: [
    ProductsService,
    AuthorizationService,
    RolesService,
  ]
})
//agregando los middlewares, debemos implementr NestModule
export class ProductsModule{}
