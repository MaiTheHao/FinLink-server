import { Injectable, Inject, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoDbBaseRepository } from './mongo-base.repository';
import { JwtRefreshTokenDocument } from 'src/entities/schemas/jwt_refresh_token.schema';
import { ManualErrorCode } from 'src/common/constants/error/error-codes.constant';

@Injectable()
export class MongoJwtRefreshTokenRepository extends MongoDbBaseRepository<JwtRefreshTokenDocument> {
	constructor(@Inject('JWT_REFRESH_TOKEN_MODEL') jwtRefreshTokenModel: Model<JwtRefreshTokenDocument>) {
		super(jwtRefreshTokenModel);
	}

	async findById(id: string): Promise<JwtRefreshTokenDocument | null> {
		const [error, result] = await super.findByField('_id', id.trim());
		if (error) {
			if (error.code === ManualErrorCode.NotFound) return null;
			throw new InternalServerErrorException('Lỗi truy vấn cơ sở dữ liệu');
		}
		return result;
	}

	async findByEmail(email: string): Promise<JwtRefreshTokenDocument | null> {
		const [error, result] = await super.findByField('email', email.trim());
		if (error) {
			if (error.code === ManualErrorCode.NotFound) return null;
			throw new InternalServerErrorException('Lỗi truy vấn cơ sở dữ liệu');
		}
		return result;
	}

	async createOrUpdate(email: string, token: string, exp: number): Promise<JwtRefreshTokenDocument> {
		const newRecord: Partial<JwtRefreshTokenDocument> = {
			_id: email.trim(),
			token,
			exp,
			createdAt: new Date(),
		};

		await super.deleteByField('email', email.trim());

		const [error, result] = await super.insertOne(newRecord);
		if (error) {
			if (error.code === ManualErrorCode.Duplicate)
				throw new ConflictException('Bản ghi refresh token đã tồn tại');
			throw new InternalServerErrorException('Lỗi khi tạo bản ghi refresh token');
		}
		return result as JwtRefreshTokenDocument;
	}

	async delete(email: string): Promise<void> {
		const [error] = await super.deleteByField('email', email.trim());
		if (error && error.code !== ManualErrorCode.NotFound) {
			throw new InternalServerErrorException('Lỗi khi xóa bản ghi refresh token');
		}
	}
}
