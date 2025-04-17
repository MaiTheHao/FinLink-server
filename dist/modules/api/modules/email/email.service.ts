import { Injectable, BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
	constructor(private readonly mailer: MailerService) {}

	async sendVerificationEmail(email: string, token: string) {
		const FRONTEND_URL = process.env.FRONTEND_URL;
		if (!FRONTEND_URL) {
			throw new BadRequestException('Frontend URL not set in environment variables');
		}
		const verificationLink = `${FRONTEND_URL}/auth/verify-email?token=${token}&email=${email}`;

		try {
			await this.mailer.sendMail({
				to: email,
				subject: '🔒 Email Verification - FinLink',
				text: `Please verify your email using this link: ${verificationLink}`,
				html: `
                  <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Verify your email</h2>
                    <p>Hello <strong>${email}</strong>,</p>
                    <p>Please click the link below to verify your email address:</p>
                    <p style="margin: 10px 0;">${verificationLink}</p>
                    <a href="${verificationLink}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">
                      Verify Email
                    </a>
                    <p style="margin-top: 20px;">If you did not request this, you can safely ignore this email.</p>
                  </div>
                `,
			});
		} catch (err) {
			console.error('Error sending email:', err);
			throw new BadRequestException('Failed to send email verification');
		}
	}

	async sendPasswordResetEmail(email: string, token: string) {
		const FRONTEND_URL = process.env.FRONTEND_URL;
		if (!FRONTEND_URL) {
			throw new BadRequestException('Frontend URL not set in environment variables');
		}
		const resetLink = `${FRONTEND_URL}/auth/verify-reset-password?token=${token}&email=${email}`;

		try {
			await this.mailer.sendMail({
				to: email,
				subject: '🔒 Password Reset - FinLink',
				text: `Reset your password using this link: ${resetLink}`,
				html: `
                  <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Reset your password</h2>
                    <p>Hello <strong>${email}</strong>,</p>
                    <p>Please click the link below to reset your password:</p>
                    <p style="margin: 10px 0;">${resetLink}</p>
                    <a href="${resetLink}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">
                      Reset Password
                    </a>
                    <p style="margin-top: 20px;">If you did not request this, you can safely ignore this email.</p>
                  </div>
                `,
			});
		} catch (err) {
			console.error('Error sending password reset email:', err);
			throw new BadRequestException('Failed to send password reset email');
		}
	}
}
