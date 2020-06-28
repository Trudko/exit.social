import {HttpModule, Module} from '@nestjs/common';
import {CryptoService} from './crypto.service';
import {CryptoController} from './crypto.controller';

@Module({
    imports: [HttpModule],
    providers: [CryptoService],
    controllers: [CryptoController]
})
export class CryptoModule {
}
