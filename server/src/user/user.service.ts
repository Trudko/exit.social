import Twitter from 'twitter-lite';
import {Injectable, NotFoundException} from '@nestjs/common';
import {ConfigService} from 'config/config.service';
import {LoggerService} from 'nest-logger';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Influencer} from 'user/model/influencer';
import {FollowerData} from 'user/model/follower.data';
import {Payout} from 'user/model/payout';
import {InfluencerDocument} from 'user/schemas/influencer-schema';
import {FollowerDocument} from 'user/schemas/follower-schema';
import {Settings} from 'user/model/settings';

export enum FollowResult {
    Success = 'success',
    NotFollower = 'notFollower',
    AlreadyFollower = 'alreadyFollower'
}

@Injectable()
export class UserService {
    constructor(
        @InjectModel('Influencer') private readonly  influencerModel: Model<InfluencerDocument>,
        private readonly configService: ConfigService,
        private readonly loggerService: LoggerService) {
    }

    async saveInfluencer(twitterProfile, token, tokenSecret) {
        const username = twitterProfile.screen_name;
        const normalPicture = twitterProfile.profile_image_url_https.split('_normal');
        const fullProfilePicture = normalPicture[0] + normalPicture[1];
      
        const influencer = {
            username,
            followersCount: twitterProfile.followers_count,
            photoURL: fullProfilePicture,
            token,
            tokenSecret
        } as InfluencerDocument;

        await this.influencerModel.findOneAndUpdate(
            {username},
            influencer,
            {
                upsert: true
            }
        );

        this.loggerService.debug('Influencer saved.');
    }

    async saveFollower(twitterProfile, token, tokenSecret, followerData): Promise<FollowResult> {

        const followerUsername = twitterProfile.screen_name;
        const {influencer: influencerUsername, email, ethAddress, ref: referencedBy} = followerData;

        const follower = {
            username: followerUsername,
            followersCount: twitterProfile.followers_count,
            photoURL: twitterProfile.profile_image_url_https,
            email,
            ethAddress,
            verified: twitterProfile.verified,
            score: twitterProfile.followers_count,
            payoutScore: twitterProfile.followers_count
        } as FollowerDocument;

        const client = new Twitter({
            // eslint-disable-next-line @typescript-eslint/camelcase
            consumer_key: this.configService.twitterConsumerKey,
            // eslint-disable-next-line @typescript-eslint/camelcase
            consumer_secret: this.configService.twitterConsumerSecret,
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token_key: token,
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token_secret: tokenSecret
        });

        const friendshipData = await client.get(
            'friendships/lookup',
            // eslint-disable-next-line @typescript-eslint/camelcase
            {screen_name: influencerUsername}
        );
        if (!friendshipData[0] || !friendshipData[0].connections.includes('following')) {
            // not a follower
            this.loggerService.debug('Not a follower of the influencer.');
            return FollowResult.NotFollower;
        }

        const influencerDocument = await this.influencerModel.findOne({username: influencerUsername}).exec();
        if (!influencerDocument) {
            throw new NotFoundException();
        }

        if (influencerDocument.followers.some(follower => follower.username == followerUsername)) {
            return FollowResult.AlreadyFollower;
        }
    
        await influencerDocument.update({
            $push: {
                followers: follower
            }
        });

        if (referencedBy && followerUsername != referencedBy) {
            this.loggerService.debug(`Adding score to referent user - ${referencedBy}: ${follower.followersCount}`);
            await this.influencerModel.updateOne(
                {
                    username: influencerUsername,
                    'followers.username': referencedBy
                },
                {$inc: {'followers.$.score': follower.followersCount, 'followers.$.payoutScore': follower.followersCount}}
            );
        }

        this.loggerService.debug(`Follower saved to influencer: ${influencerUsername}`);
        return FollowResult.Success;
    }

    async getInfluencer(username: string): Promise<Influencer> {
        const influencer = await this.influencerModel.findOne({
            username
        });
        if (!influencer) {
            return null;
        }

        const {photoURL, message, followersCount, onboarded, allowPayout} = influencer;

        return {
            username,
            photoURL,
            message,
            followersCount,
            onboarded,
            allowPayout
        };
    }

    async getFollowers(influencerID: string) {
        const influencer = await this.influencerModel.findOne({
            username: influencerID
        });

        const toFollower = ({username, email, photoURL, followersCount, verified}) => ({
            username,
            email,
            photoURL,
            followersCount,
            verified,
            status: 'converted'
        });

        return influencer?.followers?.map(toFollower) || [];
    }

    async getLeaders(influencerID: string, authenticated: boolean) {
        const influencer = await this.influencerModel.findOne({
            username: influencerID
        });

        const toLeader = ({username, ethAddress, score, payoutScore}) => ({
            username,
            ethAddress: authenticated ? ethAddress : undefined,
            score,
            payoutScore
        });

        return influencer?.followers
            ?.map(toLeader)
            .sort((a, b) => b.score - a.score) || [];
    }

    async updateInfluencerFollower(influencerID: string, followerID: string, data: FollowerData) {
        const {ethAddress} = data;

        await this.influencerModel.updateOne(
            {
                username: influencerID,
                'followers.username': followerID
            },
            {$set: {'followers.$.ethAddress': ethAddress}}
        );
    }

    async payoutFollowers(influencerID: string, payouts: Payout[]) {
        for (const payout of payouts) {
            await this.payoutFollower(influencerID, payout);
        }
    }

    async updateSettings(influencerID: string, {message, onboarded, allowPayout}: Settings) {
        await this.influencerModel.updateOne(
            {
                username: influencerID
            },
            {$set: {
                'message': message,
                'onboarded': onboarded,
                'allowPayout': allowPayout
            }}
        );
    }

    private async payoutFollower(influencerID: string, payout: Payout) {
        //TODO: handle after transaction completes

        await this.influencerModel.updateOne(
            {
                username: influencerID,
                'followers.username': payout.followerID
            },
            {$set: {'followers.$.payoutScore': 0}}
        );
    }
}
