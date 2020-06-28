import {Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, Res, Session, UseGuards} from '@nestjs/common';
import {UserService} from 'user/user.service';
import {ConfigService} from 'config/config.service';
import {AuthenticatedGuard} from 'auth/guards/authenticated.guard';
import {User} from 'auth/decorator/user.decorator';
import {FollowerData} from 'user/model/follower.data';
import {Payout} from 'user/model/payout';

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

        session.follower = {
            influencer: influencerID,
            ...query
        };
        res.redirect(`${this.configService.apiPrefix}/auth/twitter`);
    }

    @Put('influencers/:id/myself')
    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    async updateMyselfForInfluencer(@Param('id') influencerID: string, @User() user, @Body() data: FollowerData) {
        const influencer = await this.userService.getInfluencer(influencerID);
        if (!influencer) {
            throw new NotFoundException();
        }

        await this.userService.updateInfluencerFollower(influencerID, user.username, data);
    }

    @Post('payout')
    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    async payoutFollowers(@Param('id') influencerID: string, @User() user, @Body() payouts: Payout[]) {
        await this.userService.payoutFollowers(user.username, payouts);
    }
}
