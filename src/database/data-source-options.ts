// este archivo es utilizado por typeorm para realizar las migraciones
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: '0.0.0.0',
    port: 7070,
    username: 'admin',
    password: '0710',
    database: 'nest_learning',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    migrationsTableName: "migrations_typeorm",   
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
