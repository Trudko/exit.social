import {Module} from '@nestjs/common';
import {ConfigModule} from 'config/config.module';
import {TwitterStrategy} from 'twitter/twitter.strategy';
import {UserModule} from 'user/user.module';
import {LoggerModule} from 'logger/logger.module';

@Module({
    imports: [ConfigModule, UserModule, LoggerModule],
    providers: [TwitterStrategy]
})
export class TwitterModule {
}
