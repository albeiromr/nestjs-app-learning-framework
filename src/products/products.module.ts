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
    ConfigModule.forRoot( // agregando configuración para variables de entorno
      {
        //envFile es la ubicación de los archivos terminados en .env
        envFilePath: `${process.cwd()}/src/products/config/env/${process.env.NODE_ENV}.env`,
        // configuration es el archivo que toma las variables desde los archivos .env
        // y los combierte en un objeto javascript que pueda ser consumido con el configuration service
        load: [configuration],
        // validation esquema es el esquema de validación que verifica que en los archivos .env
        // las variables estén escritas correctamente, se usa la libería joi.
        validationSchema
      }
    ) 
  ],
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
    },
    // agregando interceptor para loggeo de actividad
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInteractionInterceptor,
    },
    // agregando interceptor timeout en peticiones http
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ]
})
//agregando los middlewares, debemos implementr NestModule
export class ProductsModule{}
