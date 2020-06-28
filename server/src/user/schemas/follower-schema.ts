import {Document} from 'mongoose';
import {Prop} from '@nestjs/mongoose';

export class FollowerDocument extends Document {
    @Prop()
    username: string;
    @Prop()
    photoURL: string;
    @Prop()
    followersCount: number;
    @Prop()
    email: string;
    @Prop()
    score: number;
    @Prop()
    payoutScore: number;
    @Prop()
    ethAddress: string;
    @Prop()
    verified: boolean;
}
