import { Injectable, BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { createServerUrl } from 'src/common/utils/network.util';

@Injectable()
export class EmailService {
	constructor(private readonly mailer: MailerService) {}

	async sendVerificationEmail(email: string, token: string) {
		const FRONTEND_URL = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : createServerUrl();
		if (!FRONTEND_URL) {
			throw new BadRequestException('Chưa cấu hình FRONTEND_URL trong biến môi trường');
		}

		const verificationLink = `${FRONTEND_URL}/auth/verify-email?token=${token}&email=${email}`;

		try {
			await this.mailer.sendMail({
				to: email,
				subject: '🔒 Xác thực email - FinLink',
				text: `Vui lòng xác thực email của bạn bằng liên kết sau: ${verificationLink}`,
				html: `
				  <div style="font-family: sans-serif; padding: 20px;">
					<h2>Xác thực email của bạn</h2>
					<p>Xin chào <strong>${email}</strong>,</p>
					<p>Vui lòng nhấn vào liên kết bên dưới để xác thực địa chỉ email của bạn:</p>
					<a href="${verificationLink}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">
					  Xác thực email
					</a>
					<p style="margin-top: 20px;">Nếu bạn không yêu cầu điều này, hãy bỏ qua email này.</p>
				  </div>
				`,
			});
		} catch (err) {
			throw new BadRequestException('Gửi email xác thực thất bại');
		}
	}

	async sendPasswordResetEmail(email: string, token: string) {
		const FRONTEND_URL = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : createServerUrl();
		if (!FRONTEND_URL) {
			throw new BadRequestException('Chưa cấu hình FRONTEND_URL trong biến môi trường');
		}
		const resetLink = `${FRONTEND_URL}/auth/verify-reset-password?token=${token}&email=${email}`;

		try {
			await this.mailer.sendMail({
				to: email,
				subject: '🔒 Đặt lại mật khẩu - FinLink',
				text: `Đặt lại mật khẩu của bạn bằng liên kết sau: ${resetLink}`,
				html: `
				  <div style="font-family: sans-serif; padding: 20px;">
					<h2>Đặt lại mật khẩu</h2>
					<p>Xin chào <strong>${email}</strong>,</p>
					<p>Vui lòng nhấn vào liên kết bên dưới để đặt lại mật khẩu:</p>
					<a href="${resetLink}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">
					  Đặt lại mật khẩu
					</a>
					<p style="margin-top: 20px;">Nếu bạn không yêu cầu điều này, hãy bỏ qua email này.</p>
				  </div>
				`,
			});
		} catch (err) {
			throw new BadRequestException('Gửi email đặt lại mật khẩu thất bại');
		}
	}
}
