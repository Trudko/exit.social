import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigService} from 'config/config.service';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: `mongodb://${configService.databaseHost}:${configService.databasePort}`,
                dbName: configService.databaseName,
                user: configService.databaseUsername,
                pass: configService.databasePassword,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                authMechanism: configService.databaseUsername ? 'SCRAM-SHA-1' : undefined,
                authSource: configService.databaseUsername ? configService.databaseName : undefined
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {
}
