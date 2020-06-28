import {Global, Module} from '@nestjs/common';
import {ConfigService} from 'config/config.service';

@Global()
@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`.env.${process.env.NODE_ENV || 'production'}`)
        }
    ],
    exports: [
        ConfigService
    ]
})
export class ConfigModule {
}
