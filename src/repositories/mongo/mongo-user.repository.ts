import { Injectable, Inject, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoDbBaseRepository } from './mongo-base.repository';
import { UserDocument } from 'src/entities/schemas/user.schema';
import { ManualErrorCode } from 'src/common/constants/error/error-codes.constant';

@Injectable()
export class MongoUserRepository extends MongoDbBaseRepository<UserDocument> {
	constructor(@Inject('USER_MODEL') userModel: Model<UserDocument>) {
		super(userModel);
	}

	async findById(_id: string): Promise<UserDocument | null> {
		const [error, result] = await super.findByField('_id', _id);
		if (error) {
			if (error.code === ManualErrorCode.NotFound) throw new NotFoundException(`Không tìm thấy người dùng`);
			if (error.code === ManualErrorCode.DbError)
				throw new InternalServerErrorException(`Lỗi truy vấn cơ sở dữ liệu`);
			throw new InternalServerErrorException(`Lỗi không xác định trong quá trình tìm người dùng`);
		}
		return result;
	}

	async findByEmail(email: string): Promise<UserDocument | null> {
		const [error, result] = await super.findByField('email', email.trim());
		if (error) {
			if (error.code === ManualErrorCode.NotFound) throw new NotFoundException(`Không tìm thấy người dùng`);
			if (error.code === ManualErrorCode.DbError)
				throw new InternalServerErrorException(`Lỗi trong quá trình tìm người dùng`);
			throw new InternalServerErrorException(`Lỗi không xác định trong quá trình tìm người dùng`);
		}
		return result;
	}

	async create(user: Partial<UserDocument> & { email: string }): Promise<UserDocument> {
		const [error, result] = await super.insertOne({
			...user,
			IsEmailVerified: false,
		});

		if (error) {
			if (error.code === ManualErrorCode.CreateFailed)
				throw new InternalServerErrorException(`Tạo người dùng thất bại`);
			if (error.code === ManualErrorCode.Duplicate) throw new ConflictException(`Người dùng đã tồn tại`);
			if (error.code === ManualErrorCode.DbError)
				throw new InternalServerErrorException(`Lỗi trong quá trình tìm người dùng`);
			throw new InternalServerErrorException(`Lỗi không xác định trong quá trình tạo người dùng`);
		}

		return result as UserDocument;
	}

	async update(_id: string, data: Partial<Omit<UserDocument, '_id'>>): Promise<UserDocument | null> {
		const [error, result] = await super.updateOne(_id, data);
		if (error) {
			if (error.code === ManualErrorCode.NotFound) {
				throw new NotFoundException('Không tìm thấy người dùng với ID này');
			}
			throw new InternalServerErrorException('Lỗi không xác định trong quá trình cập nhật người dùng');
		}
		return result as UserDocument;
	}

	async deleteById(_id: string): Promise<boolean> {
		const [error, result] = await super.deleteByField('_id', _id);
		if (error) {
			if (error.code === ManualErrorCode.NotFound) {
				throw new NotFoundException('Không tìm thấy người dùng với ID này');
			}
			throw new InternalServerErrorException('Lỗi không xác định trong quá trình xóa người dùng');
		}
		return Boolean(result);
	}
}
