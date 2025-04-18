import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/interfaces/user.interface';
import { JsonDbService } from 'src/database/json-db.service';
import { BaseRepository } from './base.repository';
import { cloneDeep } from 'lodash';

@Injectable()
export class UserRepository extends BaseRepository<User> {
	constructor(protected jsonDbService: JsonDbService) {
		super(jsonDbService, 'users');
	}

	async findById(_id: string): Promise<User | null> {
		return this.findByField('_id', _id.trim());
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.findByField('email', email.trim());
	}

	async create(user: Partial<User>): Promise<User> {
		const clonedUser = cloneDeep(user) as User;
		clonedUser._id = String((await super.findAll()).length + 1);
		clonedUser.IsEmailVerified = false;
		return super.create(clonedUser);
	}

	async update(_id: string, user: Partial<User>): Promise<User> {
		const existingUser = await this.findById(_id);
		if (!existingUser) {
			throw new Error(`User with _id ${_id} not found`);
		}
		const updatedUser = { ...existingUser, ...user };
		await super.update(_id, updatedUser);
		const result = await this.findById(_id);
		if (!result) {
			throw new Error(`Failed to update user with _id ${_id}`);
		}
		return result;
	}
}
