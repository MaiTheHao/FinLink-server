import { Injectable, Inject, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoDbBaseRepository } from './mongo-base.repository';
import { EmailVerificationDocument } from 'src/entities/schemas/email_verification.schema';
import { ManualErrorCode } from 'src/common/constants/error/error-codes.constant';
import { generateEmailVerificationToken } from 'src/common/utils/email_verification.util';

@Injectable()
export class MongoEmailVerificationRepository extends MongoDbBaseRepository<EmailVerificationDocument> {
	constructor(@Inject('EMAIL_VERIFICATION_MODEL') emailVerificationModel: Model<EmailVerificationDocument>) {
		super(emailVerificationModel);
	}

	async findByEmail(email: string): Promise<EmailVerificationDocument | null> {
		const [error, result] = await super.findByField('email', email.trim());
		if (error) {
			if (error.code === ManualErrorCode.NotFound) return null;
			throw new InternalServerErrorException('Lỗi truy vấn cơ sở dữ liệu');
		}
		return result;
	}

	async createOrUpdate(email: string): Promise<EmailVerificationDocument> {
		const { token, exp } = generateEmailVerificationToken(email);
		const newRecord: Partial<EmailVerificationDocument> = {
			_id: email.trim(),
			email: email.trim(),
			token,
			exp,
		};

		await super.deleteByField('email', email.trim());

		const [error, result] = await super.insertOne(newRecord);
		if (error) {
			if (error.code === ManualErrorCode.Duplicate)
				throw new ConflictException('Bản ghi xác thực email đã tồn tại');
			throw new InternalServerErrorException('Lỗi khi tạo bản ghi xác thực email');
		}
		return result as EmailVerificationDocument;
	}

	async delete(email: string): Promise<void> {
		const [error] = await super.deleteByField('email', email.trim());
		if (error && error.code !== ManualErrorCode.NotFound) {
			throw new InternalServerErrorException('Lỗi khi xóa bản ghi xác thực email');
		}
	}
}
