import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { ResetPassword } from 'src/entities/interfaces/reset_password.interface';
import { JsonDbService } from 'src/database/json-db.service';
import { generateResetPasswordToken } from 'src/common/utils/reset_password.util';

@Injectable()
export class ResetPasswordRepository extends BaseRepository<ResetPassword> {
	constructor(protected jsonDbService: JsonDbService) {
		super(jsonDbService, 'reset_password_tokens');
	}

	async findByEmail(email: string): Promise<ResetPassword | null> {
		return this.findByField('email', email.trim());
	}

	async createOrUpdateToken(email: string, newPassword: string): Promise<ResetPassword> {
		const { token, exp } = generateResetPasswordToken(email);
		const resetTokenData: Partial<ResetPassword> = {
			_id: email.trim(),
			email: email.trim(),
			newPassword: newPassword.trim(),
			token: token,
			exp: exp,
		};

		const existingToken = await this.findByEmail(email);
		if (existingToken) {
			await this.deleteById(email);
		}

		return await this.create(resetTokenData as ResetPassword);
	}

	async delete(email: string): Promise<boolean> {
		return await this.deleteByField('email', email);
	}
}
