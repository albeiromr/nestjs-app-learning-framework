// este archivo es utilizado por typeorm para realizar las migraciones
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { resolve } from 'path'

config({path: resolve(process.cwd(), 'src/config/env/development.env')},)

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    migrationsTableName: "migrations_typeorm",   
}

console.log(process.env)

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
