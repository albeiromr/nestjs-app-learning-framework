import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { GlobalMessageMiddleware } from './middlewares/global-message.middleware';
import { LoggerMiddleware } from './middlewares/logger.middelware';
import { ProductsController } from './modules/products/controllers/products.controller';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthorizationGuard } from './guards/authorization.guard';
import { RolesGuard } from './guards/roles.guard';
import { HttpFooFilter } from './filters/http-foo.filter';
import { LogInteractionInterceptor } from './Interceptors/log-interaction.interceptor';
import { TimeoutInterceptor } from './Interceptors/timeout.interceptor';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { AuthorizationService } from './services/authorization.service';
import { RolesService } from './services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ProductsModule,
        ConfigModule.forRoot( // agregando configuración para variables de entorno
            {
                //envFile es la ubicación de los archivos terminados en .env
                envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
                // configuration es el archivo que toma las variables desde los archivos .env
                // y los combierte en un objeto javascript que pueda ser consumido con el configuration service
                load: [configuration],
                // validation esquema es el esquema de validación que verifica que en los archivos .env
                // las variables estén escritas correctamente, se usa la libería joi.
                validationSchema,
                // haciendo que la configuración sea global en todos los modulos
                isGlobal: true,
            }
        ),
        TypeOrmModule.forRoot({ // agregando configuración de base de datos
            type: 'postgres',
            host: '0.0.0.0',
            port: 7070,
            username: 'admin',
            password: '0710',
            database: 'nest_learning',
            // la opción de autoLoadEntities hace que cuando registramos una entidad en un modulo 
            // hijo mediante TypeOrmModule.forFeature(entity), esa entidad se registre inmediatamente
            // en la opciín entities:[] de este mismo objeto de configuración, de esa manera no hay
            // que importar todas las entidades aquí en el app.module
            autoLoadEntities: true,
        }),
    ],
    providers: [
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
export class AppModule implements NestModule {
    //agregando los middlewares, debemos implementr NestModule

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
