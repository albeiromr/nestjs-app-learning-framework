import { ConfigurationModel } from "./configuration.model";

export const configuration = (): ConfigurationModel => ({
    database: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT, 10),
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    }
});