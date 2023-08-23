import { ConfigurationModel } from "./configuration.model";

export const configuration = (): ConfigurationModel => ({
    database: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: parseInt(process.env.DB_PORT, 10),
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE: process.env.DB_DATABASE
    },
    orm: {
        ORM_ENTITIES_PATH: process.env.ORM_ENTITIES_PATH,
        ORM_MIGRATIONS_PATH: process.env.ORM_MIGRATIONS_PATH,
        ORM_MIGRATIONS_TABLE_NAME: process.env.ORM_MIGRATIONS_TABLE_NAME
    }

});