import {Controller, Get} from '@nestjs/common';
import {AppService} from 'app.service';
import {Health} from 'types';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('/health')
    getHealth(): Health {
        return this.appService.checkHealth();
    }
}
