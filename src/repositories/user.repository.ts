import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { JsonDbService } from 'src/database/json-db.service';
import { BaseRepository } from './base.repository';
import { cloneDeep } from 'lodash';

@Injectable()
export class UserRepository extends BaseRepository<User> {
	constructor(protected jsonDbService: JsonDbService) {
		super(jsonDbService, 'users');
	}

	async findById(id: string): Promise<User | null> {
		return this.findByField('id', id.trim());
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.findByField('email', email.trim());
	}

	async create(user: Partial<User>): Promise<User> {
		const clonedUser = cloneDeep(user) as User;
		clonedUser.id = String((await super.findAll()).length + 1);
		clonedUser.isEmailVerified = false;
		return super.create(clonedUser);
	}

	async update(id: string, user: Partial<User>): Promise<User> {
		const existingUser = await this.findById(id);
		if (!existingUser) {
			throw new Error(`User with id ${id} not found`);
		}
		const updatedUser = { ...existingUser, ...user };
		await super.update(id, updatedUser);
		const result = await this.findById(id);
		if (!result) {
			throw new Error(`Failed to update user with id ${id}`);
		}
		return result;
	}
}
