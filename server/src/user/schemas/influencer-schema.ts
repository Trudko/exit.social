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
    @Prop()
    onboarded: boolean;
    @Prop()
    allowPayout: boolean;
}

export const InfluencerSchema = new Schema({
    username: String,
    photoURL: String,
    followersCount: Number,
    message: String,
    token: String,
    tokenSecret: String,
    onboarded: {
        type: Boolean,
        default: false
    },
    allowPayout: {
        type: Boolean,
        default: true
    },
    followers: [
        {
            username: String,
            followersCount: Number,
            photoURL: String,
            email: String,
            score: Number,
            verified: Boolean,
            emailVerified: {
                type: Boolean,
                default: false
            },
            verificationToken: String,
            verificationTokenExpiration: Date,
            payoutScore: Number,
            ethAddress: String,
            referencedBy: String
        }
    ]
});
