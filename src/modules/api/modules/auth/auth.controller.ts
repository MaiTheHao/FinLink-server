import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { VerifyResetPasswordDto } from './dto/verify_reset_password.dto';
import { AuthGuard } from './guards/auth.guard';
import { VerifyEmailDto } from './dto/verify_email.dto';
import { LogService } from '../../../log/log.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly logService: LogService
	) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		await this.logService.logInfo('Login attempt', loginDto.email);
		return this.authService.login(loginDto);
	}

	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		await this.logService.logInfo('Register attempt', registerDto.email);
		return this.authService.register(registerDto);
	}

	@Post('reset-password')
	async requireResetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
		await this.logService.logInfo('Reset password requested', resetPasswordDto.email);
		return this.authService.requireResetPassword(resetPasswordDto);
	}

	@Get('verify-reset-password')
	async verifyResetPasswordToken(@Query() verifyResetPasswordDto: VerifyResetPasswordDto) {
		await this.logService.logInfo('Verify reset password token', verifyResetPasswordDto.token);
		return this.authService.verifyResetPasswordToken(verifyResetPasswordDto);
	}

	@Post('send-verification-email')
	async requireVerifyEmail(@Body('email') email: string) {
		await this.logService.logInfo('Send verification email', email);
		return this.authService.requireVerifyEmail(email);
	}

	@Get('verify-email')
	async verifyEmailToken(@Query() verifyEmailDto: VerifyEmailDto) {
		await this.logService.logInfo('Verify email token', verifyEmailDto.token);
		return this.authService.verifyEmailToken(verifyEmailDto);
	}

	@UseGuards(AuthGuard)
	@Get('profile')
	async getProfile(@Request() req) {
		await this.logService.logInfo('Profile accessed', req.user?.email);
		return req.user;
	}
}
