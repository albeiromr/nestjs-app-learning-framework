export class ConfigurationModel {
    database: {
        DB_HOST: string;
        DB_PORT: number;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_DATABASE: string;
    }
    orm: {
        ORM_ENTITIES_PATH: string;
        ORM_MIGRATIONS_PATH: string;
        ORM_MIGRATIONS_TABLE_NAME: string;
    }
}