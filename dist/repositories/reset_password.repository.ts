import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { ResetPasswordToken } from 'src/entities/reset_password_token.entity';
import { JsonDbService } from 'src/database/json-db.service';
import { generateResetPasswordToken } from 'src/common/utils/reset_password.util';

@Injectable()
export class ResetPasswordRepository extends BaseRepository<ResetPasswordToken> {
	constructor(protected jsonDbService: JsonDbService) {
		super(jsonDbService, 'reset_password_tokens');
	}

	async findByEmail(email: string): Promise<ResetPasswordToken | null> {
		return this.findByField('email', email.trim());
	}

	async createOrUpdateToken(email: string, newPassword: string): Promise<ResetPasswordToken> {
		const { token, exp } = generateResetPasswordToken(email);
		const resetTokenData: Partial<ResetPasswordToken> = {
			id: email.trim(),
			email: email.trim(),
			newPassword: newPassword.trim(),
			token: token,
			exp: exp,
		};

		const existingToken = await this.findByEmail(email);
		if (existingToken) {
			await this.deleteById(email);
		}

		return await this.create(resetTokenData as ResetPasswordToken);
	}

	async delete(email: string): Promise<boolean> {
		return await this.deleteByField('email', email);
	}
}
