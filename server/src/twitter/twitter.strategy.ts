import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-twitter';

import {Injectable} from '@nestjs/common';
import {ConfigService} from 'config/config.service';
import {UserService, FollowResult} from 'user/user.service';
import {LoggerService} from 'nest-logger';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {

    constructor(private readonly configService: ConfigService, private readonly userService: UserService, private readonly loggerService: LoggerService) {
        super({
            consumerKey: configService.twitterConsumerKey,
            consumerSecret: configService.twitterConsumerSecret,
            callbackURL: `${configService.serverBaseURL}${configService.apiPrefix}/auth/twitter/callback`,
            passReqToCallback: true
        });
    }

    async validate(req: any, token: string, tokenSecret: string, profile: any, done: VerifyCallback): Promise<any> {
        const twitterProfile = JSON.parse(profile._raw);

        try {
            if (req.session.follower) {
                const {influencer, email} = req.session.follower;
                const followResult = await this.userService.saveFollower(twitterProfile, token, tokenSecret, req.session.follower);
                let redirectURL =  req.session.redirectURL = `${this.configService.viewBaseURL}/follow/${influencer}/${followResult}`;
                if (followResult === FollowResult.EmailVerify) {
                    redirectURL += `/${twitterProfile.screen_name}?email=${email}`;
                }

                req.session.redirectURL = redirectURL;
               
            } else {
                await this.userService.saveInfluencer(twitterProfile, token, tokenSecret);
            }
            const user = {username: twitterProfile.screen_name};
            done(null, user);
            return user;
        } catch (err) {
            this.loggerService.error(err);
            done(err, null);
            return null;
        } finally {
            req.session.follower = undefined;
        }
    }
}
