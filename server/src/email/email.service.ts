import { Injectable } from '@nestjs/common';
import {ServerClient}  from "postmark";
import * as postmark from "postmark";
import {LoggerService} from 'nest-logger';
import {ConfigService} from 'config/config.service';

@Injectable()
export class EmailService {
    postmarkClient: ServerClient; 
    addressFrom: string; 
    templateId: number; 

    constructor(private readonly configService: ConfigService, private readonly loggerService: LoggerService) {
        this.postmarkClient = new postmark.ServerClient(configService.emailProviderKey);
        this.addressFrom = configService.emailAddressFrom;
        this.templateId = configService.confirmationTemplateID;
    }

    sendConfirmationEmail(email: string, username: string, link: string) {
        this.loggerService.debug(`sending an email to ${email} to user ${username} link ${link}`);
        this.postmarkClient.sendEmailWithTemplate({
            TemplateId:  this.templateId,
            From: this.addressFrom,
            To: email,
            TemplateModel: {
                action_url: link,
                product_name: 'exit.social',
                name: username
            }
        });
    }
}
