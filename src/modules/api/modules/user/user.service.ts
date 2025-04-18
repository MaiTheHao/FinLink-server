import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/json/user.repository';
import { getSafeUserEmailAndPassword } from 'src/common/utils/user.util';
import { hashPassword, comparePassword } from 'src/common/utils/password.util';
import { isBcryptHash } from 'src/common/utils/hash.util';
import { User } from 'src/entities/interfaces/user.interface';
import { UserRegister } from '../auth/interfaces/user.register.interface';
import { MongoUserRepository } from 'src/repositories/mongo/mongo-user.repository';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly mongoUserRepository: MongoUserRepository
	) {}

	async findByEmail(email: string): Promise<User> {
		const user = await this.mongoUserRepository.findByEmail(email);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng với email ${email}.`);
		}
		return user;
	}

	async findById(id: string): Promise<User> {
		const user = await this.mongoUserRepository.findById(id);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
		}
		return user;
	}

	async findUserWithPassword(email: string): Promise<Pick<User, 'email' | 'password'>> {
		const user = await this.mongoUserRepository.findByEmail(email);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng với email ${email}.`);
		}
		return getSafeUserEmailAndPassword(user);
	}

	async updateProfile(id: string, data: any) {
		const user = await this.mongoUserRepository.findById(id);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng này.`);
		}

		return this.mongoUserRepository.update(id, data);
	}

	async createUser(userData: UserRegister): Promise<User> {
		const hashedPassword = await hashPassword(userData.password);

		const newUser = await this.mongoUserRepository.create({
			...userData,
			password: hashedPassword,
		});

		return newUser;
	}

	async setEmailVerified(id: string, isVerified: boolean = true): Promise<User> {
		const user = await this.mongoUserRepository.findById(id);
		if (!user) {
			throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
		}
		const updatedUser = await this.mongoUserRepository.update(id, { IsEmailVerified: isVerified });
		if (!updatedUser) {
			throw new NotFoundException(`Lỗi trong quá trình cập nhật xác thực email`);
		}
		return updatedUser as User;
	}

	async updateUserPassword(id: string, newPassword: string): Promise<User> {
		const hashedPassword = await hashPassword(newPassword);
		const updatedUser = await this.mongoUserRepository.update(id, { password: hashedPassword });
		if (!updatedUser) {
			throw new NotFoundException(`Không thể cập nhật mật khẩu cho người dùng với ID ${id}.`);
		}
		return updatedUser as User;
	}

	/**
	 * Kiểm tra xem mật khẩu đã mã hóa có hợp lệ hay không
	 * @param plainPassword - Mật khẩu gốc
	 * @param hashedPassword - Mật khẩu đã mã hóa
	 * @returns - true nếu mật khẩu đã mã hóa hợp lệ, false nếu không
	 */
	async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
		if (!isBcryptHash(hashedPassword)) {
			return false;
		}
		const isMatch = await comparePassword(plainPassword, hashedPassword);
		return isMatch;
	}
}
