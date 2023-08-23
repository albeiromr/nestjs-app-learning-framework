import * as Joi from 'joi';

// esquema de validación para las variables que están en los ficheros .env
export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid(
        'development',
        'production',
        'staging',
    ),
    HOST: Joi.string().required(),
    PORT: Joi.number().required(),
    USERNAME: Joi.string().required(),
    PASSWORD: Joi.string().required(),
    DATABASE: Joi.string().required(),
});