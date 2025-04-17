import { hashValue, compareHash } from './hash.util';

/**
 * Hash a password using bcrypt
 * @param password - The password to hash
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
	return hashValue(password);
}

/**
 * Compares a password with a hashed password
 * @param password - The password to compare
 * @param hashedPassword - The hashed password to compare against
 * @returns true if the passwords match, false otherwise
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
	return compareHash(password, hashedPassword);
}
