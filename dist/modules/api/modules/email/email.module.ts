import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				transport: {
					host: config.get('MAIL_HOST'),
					port: config.get('MAIL_PORT'),
					secure: true,
					auth: {
						user: config.get('MAIL_USER'),
						pass: config.get('MAIL_PASS'),
					},
				},
				defaults: {
					from: config.get('MAIL_FROM'),
				},
			}),
		}),
	],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
