import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { VerifyResetPasswordDto } from './dto/verify_reset_password.dto';
import { VerifyEmailDto } from './dto/verify_email.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    verifyResetPasswordToken(verifyResetPasswordDto: VerifyResetPasswordDto): Promise<{
        message: string;
    }>;
    requireVerifyEmail(email: string): Promise<{
        message: string;
    }>;
    verifyEmailToken(verifyEmailDto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<any>;
}
