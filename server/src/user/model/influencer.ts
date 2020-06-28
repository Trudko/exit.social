import {Follower} from 'user/model/follower';
import {User} from 'user/model/user';

export class Influencer extends User {
    followers?: Follower[];
    followersCount?: number;
    message?: string;
}
