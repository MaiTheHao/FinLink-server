import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { getSafeUserDetail } from 'src/common/utils/user.util';
import { hashPassword, comparePassword } from 'src/common/utils/password.util';
import { isBcryptHash } from 'src/common/utils/hash.util';
import { User } from 'src/entities/user.entity';
import { UserRegister } from '../auth/interfaces/user.register.interface';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async findByEmail(email: string) {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng với email ${email}.`);
		}
		return getSafeUserDetail(user);
	}

	async findById(id: string) {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
		}
		return getSafeUserDetail(user);
	}

	async updateProfile(id: string, data: any) {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng này.`);
		}

		return this.userRepository.update(id, { ...user, ...data });
	}

	async createUser(userData: UserRegister): Promise<User> {
		const existingUser = await this.userRepository.findByEmail(userData.email);
		if (existingUser) {
			throw new ConflictException(`Email ${userData.email} đã tồn tại.`);
		}

		const hashedPassword = await hashPassword(userData.password);

		const newUser = await this.userRepository.create({
			...userData,
			password: hashedPassword,
		});

		return newUser;
	}

	async findUserWithPassword(email: string): Promise<User> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng với email ${email}.`);
		}
		return user;
	}

	async setEmailVerified(id: string, isVerified: boolean = true): Promise<User> {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
		}

		return this.userRepository.update(id, { ...user, isEmailVerified: isVerified });
	}

	async updateUserPassword(id: string, newPassword: string): Promise<User> {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
		}

		const hashedPassword = await hashPassword(newPassword);
		return this.userRepository.update(id, { ...user, password: hashedPassword });
	}

	async verifyPassword(user: User, password: string): Promise<boolean> {
		if (!user || !isBcryptHash(user.password)) {
			return false;
		}
		return comparePassword(password, user.password);
	}
}
