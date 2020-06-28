import {Controller, Get} from '@nestjs/common';
import {CryptoService} from 'crypto/crypto.service';
import {Conversion} from '@common/conversion';

@Controller('crypto')
export class CryptoController {
    constructor(private readonly cryptoService: CryptoService) {
    }


    @Get('/conversions')
    getConversions(): Conversion[] {
        return this.cryptoService.getConversions();
    }
}
