export class ConfigurationModel {
    NODE_ENV: string;
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    }
}