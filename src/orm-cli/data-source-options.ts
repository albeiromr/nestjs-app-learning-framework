// este archivo es utilizado por el cli de typeorm para realizar las migraciones
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { resolve } from 'path'

config({path: resolve(process.cwd(), `src/config/env/${process.env.NODE_ENV}.env`)},)

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [process.env.ORM_ENTITIES_PATH],
    migrations: [process.env.ORM_MIGRATIONS_PATH],
    migrationsTableName: process.env.ORM_MIGRATIONS_TABLE_NAME   
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
