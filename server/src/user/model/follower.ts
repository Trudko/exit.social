import {User} from 'user/model/user';

export class Follower extends User {
    followersCount: number;
    email: string;
    score: number;
    payoutScore: number;
}
