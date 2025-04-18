import { generateToken, isTokenExpired as isTokenExpiredUtil, validateToken } from './token.util';
import { ResetPassword } from 'src/entities/interfaces/reset_password.interface';
import { getEnvNumber } from './env.util';

const getTokenExp = () => getEnvNumber('RESET_PASSWORD_TOKEN_EXPIRATION_MS', 3600000);

/**
 * Generates a reset password token for the user
 * @param email - The email address of the user requesting a password reset
 * @returns { token: string; exp: number } - The generated token and its expiration time in milliseconds
 */
export function generateResetPasswordToken(email: string): { token: string; exp: number } {
	return generateToken(email, getTokenExp());
}

/**
 * Check if the reset password token is expired
 * @param token - The reset password token to check
 * @returns {boolean} - true if the token is expired, false otherwise
 */
export function isTokenExpired(token: ResetPassword): boolean {
	return isTokenExpiredUtil(token.exp);
}

/**
 * Validates the reset password token
 * @param storedToken - The stored reset password token to validate against
 * @param inputToken - The input reset password token provided by the user
 * @param email - The email address of the user requesting the password reset
 * @returns {boolean} - true if the token is valid, false otherwise
 */
export function validateResetPasswordToken(storedToken: ResetPassword, inputToken: string, email: string): boolean {
	return validateToken(
		{ identifier: storedToken.email, token: storedToken.token, exp: storedToken.exp },
		inputToken,
		email
	);
}
