import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { ResetPasswordRepository } from 'src/repositories/reset_password.repository';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { VerifyResetPasswordDto } from './dto/verify_reset_password.dto';
import { JwtService } from '@nestjs/jwt';
import { VerifyEmailDto } from './dto/verify_email.dto';
import { EmailVerificationRepository } from 'src/repositories/email_verification.repository';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly emailService;
    private readonly userService;
    private readonly resetPasswordRepository;
    private readonly emailVerificationRepository;
    constructor(jwtService: JwtService, emailService: EmailService, userService: UserService, resetPasswordRepository: ResetPasswordRepository, emailVerificationRepository: EmailVerificationRepository);
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: import("../../../../entities/user.entity").User;
    }>;
    requireResetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
        token: string;
    }>;
    requireVerifyEmail(email: string): Promise<{
        message: string;
    }>;
    verifyResetPasswordToken(verifyResetPasswordDto: VerifyResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyEmailToken(verifyEmailDto: VerifyEmailDto): Promise<{
        message: string;
    }>;
}
