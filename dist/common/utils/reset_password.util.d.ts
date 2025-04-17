import { ResetPasswordToken } from 'src/entities/reset_password_token.entity';
export declare function generateResetPasswordToken(email: string): {
    token: string;
    exp: number;
};
export declare function isTokenExpired(token: ResetPasswordToken): boolean;
export declare function validateResetPasswordToken(storedToken: ResetPasswordToken, inputToken: string, email: string): boolean;
