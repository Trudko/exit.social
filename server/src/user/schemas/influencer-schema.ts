import {Prop} from '@nestjs/mongoose';
import {Document, Schema} from 'mongoose';
import {FollowerDocument} from 'user/schemas/follower-schema';

export class InfluencerDocument extends Document {
    @Prop()
    username: string;
    @Prop()
    photoURL: string;
    @Prop()
    message: string;
    @Prop()
    followersCount: number;
    @Prop()
    token: string;
    @Prop()
    tokenSecret: string;
    @Prop()
    followers: FollowerDocument[];
}

export const InfluencerSchema = new Schema({
    username: String,
    photoURL: String,
    followersCount: Number,
    message: String,
    token: String,
    tokenSecret: String,
    followers: [
        {
            username: String,
            followersCount: Number,
            photoURL: String,
            email: String,
            score: Number,
            verified: Boolean,
            payoutScore: Number,
            ethAddress: String
        }
    ]
});
