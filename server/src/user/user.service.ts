import Twitter from 'twitter-lite';
import {Injectable, NotFoundException} from '@nestjs/common';
import {ConfigService} from 'config/config.service';
import {LoggerService} from 'nest-logger';
import {EmailService} from 'email/email.service';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Influencer} from 'user/model/influencer';
import {Follower} from 'user/model/follower';
import {Payout} from 'user/model/payout';
import {InfluencerDocument} from 'user/schemas/influencer-schema';
import {FollowerDocument} from 'user/schemas/follower-schema';
import {Settings} from 'user/model/settings';
import {addDays, isAfter} from "date-fns";
import { v4 as uuid } from 'uuid';

export enum FollowResult {
    EmailVerify = 'emailVerify',
    NotFollower = 'notFollower',
    AlreadyFollower = 'alreadyFollower',
    EmailVerified = 'success',
}

@Injectable()
export class UserService {
    constructor(
        @InjectModel('Influencer') private readonly  influencerModel: Model<InfluencerDocument>,
        private readonly configService: ConfigService,
        private readonly loggerService: LoggerService,
        private readonly mailService: EmailService) {
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
            payoutScore: twitterProfile.followers_count,
            emailVerified: false,
            verificationTokenExpiration: addDays(new Date(), 7),
            verificationToken: uuid()
        } as FollowerDocument;

        if (referencedBy && followerUsername != referencedBy) {
            follower.referencedBy = referencedBy
        }

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

        const existingFollower = influencerDocument.followers.find(follower => follower.username == followerUsername)

        if (existingFollower) {
            if (existingFollower.emailVerified) {
                return FollowResult.AlreadyFollower;
            } else { 
                return FollowResult.EmailVerify
            }
        }
    
        await influencerDocument.update({
            $push: {
                followers: follower
            }
        });

        this.loggerService.debug(`Follower saved to influencer: ${influencerUsername}`);
        
        const link = `${this.configService.serverBaseURL}${this.configService.apiPrefix}/influencers/${influencerUsername}/verify/${follower.username}?token=${follower.verificationToken}`;
        await this.mailService.sendConfirmationEmail(follower.email, follower.username, link);

        return FollowResult.EmailVerify;
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

        const toFollower = ({username, email, photoURL, followersCount, verified, emailVerified, verificationToken, verificationTokenExpiration,score, payoutScore, referencedBy}) => ({
            username,
            email,
            photoURL,
            followersCount,
            verified,
            emailVerified,
            verificationToken,
            verificationTokenExpiration,
            score,
            payoutScore,
            referencedBy,
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

    async  updateInfluencerFollower(influencerID: string, follower: Follower) {
        await this.influencerModel.updateOne(
            {
                username: influencerID,
                'followers.username': follower.username
            },
            {$set: {'followers.$': follower}}
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

    async sendConfirmationEmail(influencerID: string, followerID: string) {
        const influncer = await this.influencerModel.findOne({
            username: influencerID,
            'followers.username': followerID
        });

        if (!influncer) {
            return null;
        }

        const follower = influncer.followers.find((follower) => follower.username = followerID);
       
        if (!follower) {
            return null;
        }

        if (isAfter(new Date(), follower.verificationTokenExpiration)) {
            follower.verificationTokenExpiration = addDays(new Date(), 7);
            follower.verificationToken = uuid();
        }
      
        const link = `${this.configService.serverBaseURL}${this.configService.apiPrefix}/influencers/${influencerID}/verify/${followerID}?token=${follower.verificationToken}`;
        await this.mailService.sendConfirmationEmail(follower.email, follower.username, link);
    }

    async confirmFollowerEmail(influencerID: string, follower: Follower) {
       
        const referencedBy = follower.referencedBy;

        if (referencedBy && !follower.emailVerified) {
            this.loggerService.debug(`Adding score to referent user - ${referencedBy}: ${follower.followersCount}`);
            await this.influencerModel.updateOne(
                {
                    username: influencerID,
                    'followers.username': referencedBy
                },
                {$inc: {'followers.$.score': follower.followersCount, 'followers.$.payoutScore': follower.followersCount}}
            );
        }
        follower.emailVerified = true;
        await this.updateInfluencerFollower(influencerID, follower);
        
        return FollowResult.AlreadyFollower;
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
