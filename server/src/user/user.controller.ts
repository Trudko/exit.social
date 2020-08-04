import {Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, Res, Session, UseGuards} from '@nestjs/common';
import {UserService, FollowResult} from 'user/user.service';
import {ConfigService} from 'config/config.service';
import {AuthenticatedGuard} from 'auth/guards/authenticated.guard';
import {User} from 'auth/decorator/user.decorator';
import {Follower} from 'user/model/follower';
import {Settings} from 'user/model/settings';
import {Payout} from 'user/model/payout';
import {isAfter} from "date-fns";

@Controller()
export class UserController {
    constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
    }

    @Get('followers')
    @UseGuards(AuthenticatedGuard)
    async getInfluencerFollowers(@User() user) {
        const influencer = await this.userService.getInfluencer(user.username);
        if (!influencer) {
            throw new NotFoundException();
        }

        const followers = await this.userService.getFollowers(user.username);
        return {
            total: influencer.followersCount,
            values: followers
        };
    }

    @Get('influencers/:id')
    async getInfluencer(@Param('id') influencerID: string) {
        const influencer = await this.userService.getInfluencer(influencerID);
        if (!influencer) {
            throw new NotFoundException();
        }

        return influencer;
    }

    @Get('influencers/:id/leaderboard')
    async getInfluencerLeaderboard(@Param('id') influencerID: string, @User() user) {
        const influencer = await this.userService.getInfluencer(influencerID);
        if (!influencer) {
            throw new NotFoundException();
        }

        const followers = await this.userService.getLeaders(influencerID, user?.username === influencerID);

        return {
            influencer: {
                photoURL: influencer.photoURL
            },
            followers,
            total: followers.length
        };
    }

    @Get('influencers/:id/follow')
    async followInfluencer(@Param('id') influencerID: string, @Req() req, @Session() session, @Query() query, @Res() res) {
        const influencer = await this.userService.getInfluencer(influencerID);
        if (!influencer) {
            throw new NotFoundException();
        }
        console.log(query)
        session.follower = {
            influencer: influencerID,
            ...query
        };
        res.redirect(`${this.configService.serverBaseURL}${this.configService.apiPrefix}/auth/twitter`);
    }

    @Put('influencers/:id/settings')
    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    async influencerSettings(@Param('id') influencerID: string, @Body() settings: Settings) {
        const influencer = await this.userService.getInfluencer(influencerID);
        if (!influencer) {
            throw new NotFoundException();
        }

        await this.userService.updateSettings(influencerID, settings);
    }

    @Put('influencers/:id/myself')
    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    async updateMyselfForInfluencer(@Param('id') influencerID: string, @User() user, @Body() data: Follower) {
        const influencer = await this.userService.getInfluencer(influencerID);
        if (!influencer) {
            throw new NotFoundException();
        }

        await this.userService.updateInfluencerFollower(influencerID, data);
    }

    @Post('payout')
    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    async payoutFollowers(@Param('id') influencerID: string, @User() user, @Body() payouts: Payout[]) {
        await this.userService.payoutFollowers(user.username, payouts);
    }

    @Get('influencers/:influencerid/verify/:followerid')
    @HttpCode(200)
    async verifyFollowerEmail(@Param('influencerid') influencerID: string, @Param('followerid') followerID: string,  @Res() res, @Query() query) {
        const influencer = await this.userService.getInfluencer(influencerID);
        if (!influencer) {
            res.redirect(`${this.configService.viewBaseURL}/invalidToken`);
        }

        const followers = await this.userService.getFollowers(influencerID);
        const follower: Follower = followers.find((follower: Follower) => follower.username === followerID)
        if (!follower || follower.verificationToken !== 
            query.token) {
                res.redirect(`${this.configService.viewBaseURL}/invalidToken`);
        }

        if (isAfter(new Date(), follower.verificationTokenExpiration)) {
            res.status(400).send("token_expired");
        }
        let followResult = '';
        if (follower.emailVerified) {
            followResult = FollowResult.EmailVerified
        } else {
            followResult = await this.userService.confirmFollowerEmail(influencerID, follower);
        }
     
        
        const redirectURL = `${this.configService.viewBaseURL}/follow/${influencerID}/${followResult}/${follower.username}`;
     
        res.redirect(redirectURL);
    }

    @Put('influencers/:influencerid/verify/:followerid')
    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    async resendEmail(@Param('influencerid') influencerID: string, @Param('followerid') followerID: string) {
        await this.userService.sendConfirmationEmail(influencerID, followerID);
    }
}
