import {
	Injectable,
	BadRequestException,
	NotFoundException,
	ConflictException,
	UnauthorizedException,
	ForbiddenException,
	InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { UserRegister } from './interfaces/user.register.interface';
import { ResetPasswordRepository } from 'src/repositories/json/reset_password.repository';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { VerifyResetPasswordDto } from './dto/verify_reset_password.dto';
import { validateResetPasswordToken } from 'src/common/utils/reset_password.util';
import { JwtService } from '@nestjs/jwt';
import { VerifyEmailDto } from './dto/verify_email.dto';
import { EmailVerificationRepository } from 'src/repositories/json/email_verification.repository';
import { validateEmailVerificationToken } from 'src/common/utils/email_verification.util';
import { EmailService } from '../email/email.service';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly emailService: EmailService,
		private readonly userService: UserService,
		private readonly resetPasswordRepository: ResetPasswordRepository,
		private readonly emailVerificationRepository: EmailVerificationRepository
	) {}

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;

		try {
			const user = await this.userService.findByEmail(email);
			if (isEmpty(user)) throw new NotFoundException('Người dùng không tồn tại');

			if (!user.IsEmailVerified) throw new ForbiddenException('Email chưa được xác thực');

			if (isEmpty(user.password)) {
				throw new UnauthorizedException('Tài khoản này không có mật khẩu');
			}

			const isPasswordValid = await this.userService.verifyPassword(password, user.password);
			if (!isPasswordValid) {
				throw new UnauthorizedException('Mật khẩu không chính xác');
			}

			const payload = { email: user.email, sub: user._id };
			const token = await this.jwtService.signAsync(payload);

			return { message: 'Đăng nhập thành công', access_token: token };
		} catch (error) {
			if (
				error instanceof NotFoundException ||
				error instanceof ForbiddenException ||
				error instanceof UnauthorizedException
			) {
				throw error;
			}
			throw new UnauthorizedException('Đăng nhập thất bại');
		}
	}

	async register(registerDto: RegisterDto) {
		const { email, password, confirmPassword, username } = registerDto;

		if (password.trim() !== confirmPassword.trim()) {
			throw new BadRequestException('Xác nhận mật khẩu không khớp');
		}

		try {
			const newUser = await this.userService.createUser({
				email,
				password,
				username,
			} as UserRegister);

			return { message: 'Đăng ký thành công', user: newUser };
		} catch (error) {
			if (error instanceof ConflictException) {
				throw error;
			}
			throw new BadRequestException('Đăng ký thất bại');
		}
	}

	async requireResetPassword(resetPasswordDto: ResetPasswordDto) {
		const { email, newPassword, confirmPassword } = resetPasswordDto;

		if (newPassword.trim() !== confirmPassword.trim()) {
			throw new BadRequestException('Xác nhận mật khẩu không khớp');
		}

		const record = await this.resetPasswordRepository.createOrUpdateToken(email, newPassword);
		if (!record) {
			throw new InternalServerErrorException('Không thể tạo yêu cầu đặt lại mật khẩu');
		}

		await this.emailService.sendPasswordResetEmail(email, record.token);

		return { message: 'Yêu cầu đặt lại mật khẩu đã được gửi', token: record.token };
	}

	async requireVerifyEmail(email: string) {
		try {
			const user = await this.userService.findByEmail(email);

			if (user.IsEmailVerified) {
				throw new ConflictException('Email đã được xác thực');
			}

			const record = await this.emailVerificationRepository.createOrUpdate(email);
			if (!record) {
				throw new InternalServerErrorException('Không thể tạo yêu cầu xác thực email');
			}

			await this.emailService.sendVerificationEmail(email, record.token);

			return { message: 'Yêu cầu xác thực email đã được gửi' };
		} catch (error) {
			if (error instanceof NotFoundException || error instanceof ConflictException) {
				throw error;
			}
			throw new BadRequestException('Gửi yêu cầu xác thực email thất bại');
		}
	}

	async verifyResetPasswordToken(verifyResetPasswordDto: VerifyResetPasswordDto) {
		const { email, token } = verifyResetPasswordDto;

		const storedToken = await this.resetPasswordRepository.findByEmail(email);
		if (!storedToken) {
			throw new NotFoundException('Không tìm thấy mã xác thực');
		}

		try {
			if (!validateResetPasswordToken(storedToken, token, email)) {
				await this.resetPasswordRepository.delete(email);
				throw new BadRequestException('Mã xác thực không hợp lệ hoặc đã hết hạn');
			}

			const user = await this.userService.findByEmail(email);

			await Promise.all([
				this.userService.updateUserPassword(user._id, storedToken.newPassword),
				this.resetPasswordRepository.delete(email),
			]);

			return { message: 'Đặt lại mật khẩu thành công' };
		} catch (error) {
			if (error instanceof NotFoundException || error instanceof BadRequestException) {
				throw error;
			}
			throw new BadRequestException('Xác thực đặt lại mật khẩu thất bại');
		}
	}

	async verifyEmailToken(verifyEmailDto: VerifyEmailDto) {
		const { token, email } = verifyEmailDto;

		const record = await this.emailVerificationRepository.findByEmail(email);
		if (!record) {
			throw new NotFoundException('Không tìm thấy yêu cầu xác thực, có thể đã hết hạn hoặc chưa từng tồn tại');
		}

		try {
			const user = await this.userService.findByEmail(email);

			if (user.IsEmailVerified) {
				throw new ConflictException('Email đã được xác thực');
			}

			if (!validateEmailVerificationToken(record, token, email)) {
				await this.emailVerificationRepository.delete(email);
				throw new BadRequestException('Mã xác thực không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu lại.');
			}

			await Promise.all([
				this.userService.setEmailVerified(user._id, true),
				this.emailVerificationRepository.delete(email),
			]);

			return { message: 'Xác thực email thành công' };
		} catch (error) {
			if (
				error instanceof NotFoundException ||
				error instanceof ConflictException ||
				error instanceof BadRequestException
			) {
				throw error;
			}
			throw new BadRequestException('Xác thực email thất bại');
		}
	}
}
