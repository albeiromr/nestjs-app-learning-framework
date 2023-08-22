import { ConfigurationModel } from "./configuration.model";


export const configuration = (): ConfigurationModel => ({
    node_env: process.env.NODE_ENV,
    database: {
        type: process.env.TYPE,
        host: process.env.HOST,
        port: parseInt(process.env.PORT, 10),
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    }
});