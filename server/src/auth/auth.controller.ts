import {Controller, Get, Res, Req, Session, UnauthorizedException, UseGuards, HttpCode} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ConfigService} from 'config/config.service';
import {UserService} from 'user/user.service';
import {AuthenticatedGuard} from 'auth/guards/authenticated.guard';
import {TwitterAuthGuard} from 'twitter/guards/twitter.auth.guard';
import {User} from 'auth/decorator/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
    }

    @Get('session')
    @UseGuards(AuthenticatedGuard)
    async getCurrentUser(@User() user) {
        const influencer = await this.userService.getInfluencer(user.username);
        if (!influencer) {
            throw new UnauthorizedException();
        }
        return influencer;
    }

    @Get('twitter')
    @UseGuards(AuthGuard('twitter'))
    singInToTwitter() {
        // AuthGuard taking care of it
    }

    @Get('twitter/callback')
    @UseGuards(TwitterAuthGuard)
    twitterCallback(@Session() session, @Res() res) {
        const redirectURL = session.redirectURL || `${this.configService.viewBaseURL}/dashboard`;
        session.redirectURL = undefined;
        res.redirect(redirectURL);
    }
    
    @Get('/signout')
    @HttpCode(204)
    signout(@Req() req, @Res() res) {
        req.session.destroy( () => {
           res.end();
        });
    }
}
