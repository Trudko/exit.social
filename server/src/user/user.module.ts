import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {InfluencerSchema} from 'user/schemas/influencer-schema';
import {UserService} from './user.service';
import {LoggerModule} from 'logger/logger.module';
import {UserController} from 'user/user.controller';
import { EmailModule } from 'email/email.module';
import { EmailService } from 'email/email.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Influencer',
                schema: InfluencerSchema
            }
        ]),
        LoggerModule,
        EmailModule
    ],
    providers: [UserService, EmailService],
    exports: [UserService],
    controllers: [UserController]
})
export class UserModule {
}
