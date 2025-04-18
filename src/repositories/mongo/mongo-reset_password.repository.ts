import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoDbBaseRepository } from './mongo-base.repository';
import { ResetPasswordDocument } from 'src/entities/schemas/reset_password.schema';
import { ManualErrorCode } from 'src/common/constants/error/error-codes.constant';
import { generateResetPasswordToken } from 'src/common/utils/reset_password.util';

@Injectable()
export class MongoResetPasswordRepository extends MongoDbBaseRepository<ResetPasswordDocument> {
	constructor(@Inject('RESET_PASSWORD_MODEL') resetPasswordModel: Model<ResetPasswordDocument>) {
		super(resetPasswordModel);
	}

	async findByEmail(email: string): Promise<ResetPasswordDocument | null> {
		const [error, result] = await super.findByField('email', email.trim());
		if (error) {
			if (error.code === ManualErrorCode.NotFound) return null;
			throw new InternalServerErrorException('Lỗi truy vấn cơ sở dữ liệu');
		}
		return result;
	}

	async createOrUpdateToken(email: string, newPassword: string): Promise<ResetPasswordDocument> {
		const { token, exp } = generateResetPasswordToken(email);
		const resetTokenData: Partial<ResetPasswordDocument> = {
			_id: email.trim(),
			email: email.trim(),
			newPassword: newPassword.trim(),
			token,
			exp,
		};

		await super.deleteByField('email', email.trim());

		const [error, result] = await super.insertOne(resetTokenData);
		if (error) {
			throw new InternalServerErrorException('Không thể tạo token đặt lại mật khẩu');
		}
		return result as ResetPasswordDocument;
	}

	async delete(email: string): Promise<boolean> {
		const [error, result] = await super.deleteByField('email', email.trim());
		if (error) {
			throw new InternalServerErrorException('Lỗi khi xóa token đặt lại mật khẩu');
		}
		return Boolean(result);
	}
}
