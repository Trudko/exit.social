import {Injectable} from '@nestjs/common';
import {Health} from 'types';

@Injectable()
export class AppService {
    checkHealth(): Health {
        return Health.OK;
    }
}
