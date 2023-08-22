export class ConfigurationModel {
    node_env: string;
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    }
}