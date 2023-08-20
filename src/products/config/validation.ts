import * as Joi from 'joi';

// esquema de validación para las variables que están en los ficheros .env
export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid(
        'development',
        'production',
        'staging',
    ),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    PORT: Joi.number().required(),
});