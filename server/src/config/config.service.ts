import dotenv from 'dotenv';
import fs from 'fs';
import {Injectable} from '@nestjs/common';
import {LoggerTransport} from 'nest-logger';

@Injectable()
export class ConfigService {
    private readonly envConfig: {[key: string]: string};

    constructor(filePath: string) {
        let dotenvConfig;
        if (fs.existsSync(filePath)) {
            dotenvConfig = dotenv.parse(fs.readFileSync(filePath));
        } else {
            // eslint-disable-next-line no-console
            console.warn(`Configuration file ${filePath} does not exists. Using default values (not recommended).`);
            dotenvConfig = {};
        }

        this.envConfig = {
            ...process.env,
            ...dotenvConfig
        };
    }

    get port(): number {
        return Number(this.envConfig.PORT) || 8080;
    }

    get enableCors(): boolean {
        return Boolean(this.envConfig.ENABLE_CORS);
    }

    get apiPrefix(): string {
        return this.envConfig.API_PREFIX || '';
    }

    get useSwaggerUI(): boolean {
        return Boolean(this.envConfig.USE_SWAGGER_UI);
    }

    get staticContentPath(): string | null {
        return this.envConfig.STATIC_CONTENT_PATH || null;
    }

    get logLevel(): string {
        return this.envConfig.LOG_LEVEL || 'info';
    }

    get serviceName(): string {
        return this.envConfig.SERVICE_NAME || 'app';
    }

    get logAppender(): LoggerTransport {
        if (this.envConfig.LOG_APPENDER === 'console') {
            return LoggerTransport.CONSOLE;
        } else {
            return LoggerTransport.ROTATE;
        }
    }

    get logFilePath(): string {
        return this.envConfig.LOG_FILE_PATH || './logs/';
    }

    get databaseHost(): string {
        return this.envConfig.DATABASE_HOST || 'localhost';
    }

    get databasePort(): number {
        return this.envConfig.DATABASE_PORT && Number(this.envConfig.DATABASE_PORT);
    }

    get databaseUsername(): string {
        return this.envConfig.DATABASE_USERNAME;
    }

    get databasePassword(): string {
        return this.envConfig.DATABASE_PASSWORD;
    }

    get databaseName(): string {
        return this.envConfig.DATABASE_NAME || this.serviceName;
    }

    get twitterConsumerKey(): string {
        return this.envConfig.TWITTER_CONSUMER_KEY;
    }

    get twitterConsumerSecret(): string {
        return this.envConfig.TWITTER_CONSUMER_SECRET;
    }

    get serverBaseURL(): string {
        return this.envConfig.SERVER_BASE_URL;
    }

    get viewBaseURL(): string {
        return this.envConfig.VIEW_BASE_URL;
    }

    get sessionSecret(): string {
        return this.envConfig.SESSION_SECRET;
    }
}
