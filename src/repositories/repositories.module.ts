import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ResetPasswordRepository } from './reset_password.repository';
import { EmailVerificationRepository } from './email_verification.repository';

@Module({
	imports: [DatabaseModule],
	providers: [UserRepository, ResetPasswordRepository, EmailVerificationRepository],
	exports: [UserRepository, ResetPasswordRepository, EmailVerificationRepository],
})
export class RepositoriesModule {}
