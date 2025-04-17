import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { VerifyResetPasswordDto } from './dto/verify_reset_password.dto';
import { AuthGuard } from './guards/auth.guard';
import { VerifyEmailDto } from './dto/verify_email.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		return this.authService.register(registerDto);
	}

	@Post('reset-password')
	async requireResetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
		return this.authService.requireResetPassword(resetPasswordDto);
	}

	@Get('verify-reset-password')
	async verifyResetPasswordToken(@Query() verifyResetPasswordDto: VerifyResetPasswordDto) {
		return this.authService.verifyResetPasswordToken(verifyResetPasswordDto);
	}

	@Post('send-verification-email')
	async requireVerifyEmail(@Body('email') email: string) {
		return this.authService.requireVerifyEmail(email);
	}

	@Get('verify-email')
	async verifyEmailToken(@Query() verifyEmailDto: VerifyEmailDto) {
		console.log(verifyEmailDto);
		return this.authService.verifyEmailToken(verifyEmailDto);
	}

	@UseGuards(AuthGuard)
	@Get('profile')
	async getProfile(@Request() req) {
		return req.user;
	}
}
