import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { EmailVerification } from 'src/entities/email_verification';
import { JsonDbService } from 'src/database/json-db.service';
import { generateEmailVerificationToken } from 'src/common/utils/email_verification.util';

@Injectable()
export class EmailVerificationRepository extends BaseRepository<EmailVerification> {
	constructor(protected jsonDbService: JsonDbService) {
		super(jsonDbService, 'email_verifications');
	}

	async findByEmail(email: string): Promise<EmailVerification | null> {
		return this.findByField('email', email);
	}

	async createOrUpdate(email: string): Promise<EmailVerification> {
		const { token, exp } = generateEmailVerificationToken(email);
		const newRecord: Partial<EmailVerification> = {
			id: email.trim(),
			email: email.trim(),
			token,
			exp: exp,
		};

		const existing = await this.findByEmail(email);
		if (existing) {
			await this.deleteByField('email', email);
		}

		return await super.create(newRecord);
	}

	async delete(email: string): Promise<void> {
		await this.deleteByField('email', email);
	}
}
