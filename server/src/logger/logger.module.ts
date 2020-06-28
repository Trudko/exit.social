import {Module} from '@nestjs/common';
import {LoggerOptions, LoggerService} from 'nest-logger';
import {ConfigService} from 'config/config.service';
import {ConfigModule} from 'config/config.module';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: LoggerService,
            useFactory: (config: ConfigService) => {
                const options: LoggerOptions = {
                    fileOptions: {
                        filename: `${config.logFilePath}/${config.serviceName}-%DATE%.log`
                    }
                };
                const loggers = LoggerService.getLoggers(
                    [config.logAppender],
                    options
                );
                return new LoggerService(
                    config.logLevel,
                    loggers
                );
            },
            inject: [ConfigService]
        }
    ],
    exports: [LoggerService]
})
export class LoggerModule {
}
