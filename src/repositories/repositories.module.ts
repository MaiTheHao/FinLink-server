import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MongoUserRepository } from './mongo/mongo-user.repository';
import { JsonLogRepository } from './json/json-log.repository';
import { MongoEmailVerificationRepository } from './mongo/mongo-email_verification.repository';
import { MongoResetPasswordRepository } from './mongo/mongo-reset_password.repository';

@Module({
	imports: [DatabaseModule],
	providers: [
		// JSON repositories
		JsonLogRepository,
		// MongoDB repositories
		MongoUserRepository,
		MongoEmailVerificationRepository,
		MongoResetPasswordRepository,
	],
	exports: [
		// JSON repositories
		JsonLogRepository,
		// MongoDB repositories
		MongoUserRepository,
		MongoEmailVerificationRepository,
		MongoResetPasswordRepository,
	],
})
export class RepositoriesModule {}
