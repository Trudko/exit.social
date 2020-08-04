import {User} from 'user/model/user';

export class Follower extends User {
    followersCount: number;
    email: string;
    score: number;
    payoutScore: number;
    verificationToken: string;
    verificationTokenExpiration: Date;
    emailVerified: boolean;
    verified: boolean;
    status: string;
    referencedBy: string;
}
