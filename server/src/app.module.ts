import {Module} from '@nestjs/common';
import {join} from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';
import {AppController} from 'app.controller';
import {AppService} from 'app.service';
import {ConfigModule} from 'config/config.module';
import {ConfigService} from 'config/config.service';
import {DatabaseModule} from 'database/database.module';
import {AuthModule} from 'auth/auth.module';
import {UserModule} from 'user/user.module';
import {TwitterModule} from 'twitter/twitter.module';
import {CryptoModule} from './crypto/crypto.module';
import { EmailModule } from './email/email.module';

@Module({
    imports: [
        ConfigModule,
        ServeStaticModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                if (config.staticContentPath) {
                    return [{
                        rootPath: config.staticContentPath.startsWith('/')
                            ? config.staticContentPath
                            : join(__dirname, '..', config.staticContentPath),
                        serveStaticOptions: {
                            setHeaders: (res: any, path: string) => {
                                if (path.endsWith('/index.html')) {
                                    res.setHeader('Cache-Control', 'no-cache');
                                }
                            }
                        }
                    }];
                } else {
                    return [];
                }
            },
            inject: [ConfigService]
        }),
        DatabaseModule,
        AuthModule,
        UserModule,
        TwitterModule,
        CryptoModule,
        EmailModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
