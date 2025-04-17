import { generateToken, isTokenExpired, validateToken } from './token.util';
import { getEnvNumber } from './env.util';

const getTokenExp = () => getEnvNumber('EMAIL_VERIFICATION_TOKEN_EXPIRATION_MS', 3600000);

/**
 * Generates an email verification token for the user
 * @param email - The email address of the user requesting email verification
 * @returns { token: string; exp: number } - The generated token and its expiration time in milliseconds
 */
export function generateEmailVerificationToken(email: string): { token: string; exp: number } {
	return generateToken(email, getTokenExp());
}

/**
 * Check if the email verification token is expired
 * @param token - The email verification token object to check
 * @returns {boolean} - true if the token is expired, false otherwise
 */
export function isEmailVerificationTokenExpired(token: { exp: number }): boolean {
	return isTokenExpired(token.exp);
}

/**
 * Validates the email verification token
 * @param storedToken - The stored email verification token object to validate against
 * @param inputToken - The input email verification token provided by the user
 * @param email - The email address of the user requesting the email verification
 * @returns {boolean} - true if the token is valid, false otherwise
 */
export function validateEmailVerificationToken(
	storedToken: { email: string; token: string; exp: number },
	inputToken: string,
	email: string
): boolean {
	const mappedStored = {
		identifier: storedToken.email,
		token: storedToken.token,
		exp: storedToken.exp,
	};
	return validateToken(mappedStored, inputToken, email);
}
