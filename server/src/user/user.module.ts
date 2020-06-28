import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {InfluencerSchema} from 'user/schemas/influencer-schema';
import {UserService} from './user.service';
import {LoggerModule} from 'logger/logger.module';
import {UserController} from 'user/user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Influencer',
                schema: InfluencerSchema
            }
        ]),
        LoggerModule
    ],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController]
})
export class UserModule {
}
