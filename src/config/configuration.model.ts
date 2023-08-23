export class ConfigurationModel {
    node_env: string;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    }
}