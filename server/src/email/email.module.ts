import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import {ConfigModule} from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [EmailService]
})

export class EmailModule {}
