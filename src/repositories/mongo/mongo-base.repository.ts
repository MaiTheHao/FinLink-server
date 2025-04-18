import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
import { ErrorFirstResult } from 'src/entities/interfaces/error.interface';
import { createCustomError } from 'src/common/utils/error.util';
import { ManualErrorCode } from 'src/common/constants/error/error-codes.constant';

@Injectable()
export class MongoDbBaseRepository<T extends Document> {
	constructor(protected readonly model: Model<T>) {}

	protected async findAll(): Promise<ErrorFirstResult<T[]>> {
		try {
			const result = await this.model.find().exec();
			if (isEmpty(result)) {
				return [createCustomError(ManualErrorCode.NotFound, 'Không tìm thấy bất kỳ tài liệu nào'), null];
			}
			return [null, result];
		} catch (error) {
			return [createCustomError(ManualErrorCode.DbError, 'Lỗi truy vấn cơ sở dữ liệu', error), null];
		}
	}

	protected async findByField(field: keyof T, value: any): Promise<ErrorFirstResult<T | null>> {
		try {
			// Solve case field is email -> id
			if (field === 'email') field = '_id' as keyof T;

			const query = { [field]: value } as FilterQuery<T>;
			const result = await this.model.findOne(query).exec();
			if (isEmpty(result)) {
				return [createCustomError(ManualErrorCode.NotFound, 'Không tìm thấy tài liệu với trường đã cho'), null];
			}

			return [null, result];
		} catch (error) {
			return [createCustomError(ManualErrorCode.DbError, 'Lỗi truy vấn cơ sở dữ liệu', error), null];
		}
	}

	protected async findAllByField(field: keyof T, value: any): Promise<ErrorFirstResult<T[]>> {
		try {
			const query = { [field]: value } as FilterQuery<T>;
			const result = await this.model.find(query).exec();
			if (isEmpty(result)) {
				return [
					createCustomError(ManualErrorCode.NotFound, 'Không tìm thấy tài liệu nào với trường đã cho'),
					null,
				];
			}
			return [null, result];
		} catch (error) {
			return [createCustomError(ManualErrorCode.DbError, 'Lỗi truy vấn cơ sở dữ liệu', error), null];
		}
	}

	protected async insertOne(data: Partial<T>): Promise<ErrorFirstResult<T>> {
		try {
			const newDocument = new this.model(data);
			const savedDocument = await newDocument.save();

			if (isEmpty(savedDocument)) {
				return [createCustomError(ManualErrorCode.CreateFailed, 'Lỗi khi tạo tài liệu mới'), null];
			}

			return [null, savedDocument];
		} catch (error) {
			if (error.code === 11000) {
				return [createCustomError(ManualErrorCode.Duplicate, 'Tài liệu đã tồn tại', error), null];
			}
			return [createCustomError(ManualErrorCode.DbError, 'Lỗi khi tạo tài liệu mới', error), null];
		}
	}

	protected async updateOne(_id: string, data: Partial<Omit<T, '_id'>>): Promise<ErrorFirstResult<T | null>> {
		try {
			const result = await this.model
				.findByIdAndUpdate(_id, { $set: data } as UpdateQuery<T>, { new: true })
				.exec();

			if (isEmpty(result)) {
				return [createCustomError(ManualErrorCode.NotFound, 'Không tìm thấy tài liệu với ID đã cho'), null];
			}

			return [null, result];
		} catch (error) {
			return [createCustomError(ManualErrorCode.DbError, 'Không thể cập nhật tài liệu', error), null];
		}
	}

	protected async deleteByField(field: keyof T, value: any): Promise<ErrorFirstResult<boolean>> {
		try {
			const query = { [field]: value } as FilterQuery<T>;
			const result = await this.model.deleteOne(query).exec();
			return [null, result.deletedCount > 0];
		} catch (error) {
			return [createCustomError(ManualErrorCode.DbError, 'Lỗi khi xóa tài liệu', error), null];
		}
	}

	protected async countDocuments(query: FilterQuery<T> = {}): Promise<ErrorFirstResult<number>> {
		try {
			const count = await this.model.countDocuments(query).exec();
			return [null, count];
		} catch (error) {
			return [createCustomError(ManualErrorCode.DbError, 'Lỗi khi đếm tài liệu', error), null];
		}
	}

	protected async exists(query: FilterQuery<T>): Promise<ErrorFirstResult<boolean>> {
		try {
			const count = await this.model.countDocuments(query).limit(1).exec();
			return [null, count > 0];
		} catch (error) {
			return [
				createCustomError(ManualErrorCode.DbError, 'Lỗi khi kiểm tra tài liệu có tồn tại hay không', error),
				null,
			];
		}
	}
}
