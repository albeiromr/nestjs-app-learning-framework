import * as Joi from 'joi';

// esquema de validación para las variables que están en los ficheros .env
export const validationSchema = Joi.object({

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),

    ORM_ENTITIES_PATH: Joi.string().required(),
    ORM_MIGRATIONS_PATH: Joi.string().required(),
    ORM_MIGRATIONS_TABLE_NAME: Joi.string().required()

});