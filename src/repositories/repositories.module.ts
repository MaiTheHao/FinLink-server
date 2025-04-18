import { Module } from '@nestjs/common';
import { UserRepository } from './json/user.repository';
import { DatabaseModule } from '../database/database.module';
import { ResetPasswordRepository } from './json/reset_password.repository';
import { EmailVerificationRepository } from './json/email_verification.repository';
import { MongoUserRepository } from './mongo/mongo-user.repository';
import { JsonLogRepository } from './json/json-log.repository';
import { MongoEmailVerificationRepository } from './mongo/mongo-email_verification.repository';
import { MongoResetPasswordRepository } from './mongo/mongo-reset_password.repository';

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
		MongoEmailVerificationRepository,
		MongoResetPasswordRepository,
	],
	exports: [
		// JSON repositories
		UserRepository,
		ResetPasswordRepository,
		EmailVerificationRepository,
		JsonLogRepository,
		// MongoDB repositories
		MongoUserRepository,
		MongoEmailVerificationRepository,
		MongoResetPasswordRepository,
	],
})
export class RepositoriesModule {}
