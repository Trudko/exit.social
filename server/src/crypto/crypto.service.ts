import {HttpService, Injectable, OnModuleInit} from '@nestjs/common';
import {Conversion} from '@common/conversion';

const CONVERSIONS_FETCH_INTERVAL = 5 * 60 * 1000;
const RELEVANT_CONVERSIONS = [
    'ETHUSDT',
    'USDTETH'
];

@Injectable()
export class CryptoService implements OnModuleInit {
    private conversions: Conversion[] = [];

    constructor(private readonly httpService: HttpService) {
    }

    private async refreshConversions() {
        const data = (await this.httpService.get('https://api.binance.com/api/v3/ticker/price').toPromise()).data;
        this.conversions = data.filter(conversion => RELEVANT_CONVERSIONS.includes(conversion.symbol));
    }

    async onModuleInit() {
        setInterval(() => this.refreshConversions(), CONVERSIONS_FETCH_INTERVAL);
        return await this.refreshConversions();
    }

    getConversions(): Conversion[] {
        return this.conversions;
    }
}
