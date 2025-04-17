import { createHash, timingSafeEqual } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a secure token and its expiration time.
 * @param identifier - The unique identifier (e.g., email) for the token.
 * @param expirationMs - Token expiration time in milliseconds.
 * @returns { token: string; exp: number }
 */
export function generateToken(identifier: string, expirationMs: number): { token: string; exp: number } {
	const timestamp = Date.now();
	const randomValue = uuidv4();
	const data = `${identifier}:${timestamp}:${randomValue}`;
	const token = createHash('sha256').update(data).digest('hex');
	const exp = timestamp + expirationMs;
	return { token, exp };
}

/**
 * Checks if a token is expired.
 * @param exp - The expiration timestamp of the token.
 * @returns {boolean}
 */
export function isTokenExpired(exp?: number): boolean {
	if (!exp) return true;
	return Date.now() > exp;
}

/**
 * Validates a token using timing-safe comparison.
 * @param stored - The stored token object.
 * @param inputToken - The input token string to validate.
 * @param identifier - The identifier (e.g., email) to match.
 * @returns {boolean}
 */
export function validateToken(
	stored: { identifier: string; token: string; exp: number },
	inputToken: string,
	identifier: string
): boolean {
	if (!stored.identifier || !stored.token) return false;
	if (stored.identifier !== identifier) return false;
	if (isTokenExpired(stored.exp)) return false;

	const storedBuffer = Buffer.from(stored.token.trim());
	const inputBuffer = Buffer.from(inputToken.trim());
	if (storedBuffer.length !== inputBuffer.length) return false;
	return timingSafeEqual(storedBuffer, inputBuffer);
}
