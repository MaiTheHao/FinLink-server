import { ResetPassword } from 'src/entities/interfaces/reset_password.interface';
export declare function generateResetPasswordToken(email: string): {
    token: string;
    exp: number;
};
export declare function isTokenExpired(token: ResetPassword): boolean;
export declare function validateResetPasswordToken(storedToken: ResetPassword, inputToken: string, email: string): boolean;
