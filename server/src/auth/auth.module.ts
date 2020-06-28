import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {UserModule} from 'user/user.module';
import {ConfigModule} from 'config/config.module';
import {SessionSerializer} from 'auth/session.serializer';

@Module({
    imports: [UserModule, ConfigModule],
    controllers: [AuthController],
    providers: [SessionSerializer]
})
export class AuthModule {
}
