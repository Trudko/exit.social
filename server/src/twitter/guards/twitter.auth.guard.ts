import {AuthGuard} from '@nestjs/passport';
import {ExecutionContext} from '@nestjs/common';

export class TwitterAuthGuard extends AuthGuard('twitter') {
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}
