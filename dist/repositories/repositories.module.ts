import { Module } from '@nestjs/common';
import { UserRepository } from './json/user.repository';
import { DatabaseModule } from '../database/database.module';
import { ResetPasswordRepository } from './json/reset_password.repository';
import { EmailVerificationRepository } from './json/email_verification.repository';
import { MongoUserRepository } from './mongo/mongo-user.repository';
import { JsonLogRepository } from './json/json-log.repository';

@Module({
	imports: [DatabaseModule],
	providers: [
		// JSON repositories
		UserRepository,
		ResetPasswordRepository,
		EmailVerificationRepository,
		JsonLogRepository,
		// MongoDB repositories
		MongoUserRepository,
	],
	exports: [
		// JSON repositories
		UserRepository,
		ResetPasswordRepository,
		EmailVerificationRepository,
		JsonLogRepository,
		// MongoDB repositories
		MongoUserRepository,
	],
})
export class RepositoriesModule {}
