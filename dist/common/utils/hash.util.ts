import * as bcrypt from 'bcryptjs';

/**
 * Hash a value using bcrypt
 * @param value - The value to hash
 * @returns The hashed value
 */
export async function hashValue(value: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(value, salt);
}

/**
 * Compare a value with a hashed value
 * @param value - The value to compare
 * @param hashedValue - The hashed value to compare against
 * @returns true if the values match, false otherwise
 */
export async function compareHash(value: string, hashedValue: string): Promise<boolean> {
	return bcrypt.compare(value, hashedValue);
}

/**
 * Check if a string is a valid bcrypt hash
 * @param hash - The string to check
 * @returns true if the string is a valid bcrypt hash, false otherwise
 */
export function isBcryptHash(hash: string): boolean {
	// bcrypt hashes start with $2a$, $2b$, or $2y$ and are 60 chars long
	return /^\$2[aby]\$.{56}$/.test(hash);
}

/**
 * Encrypt a value (alias for hashValue)
 * @param value - The value to encrypt
 * @returns The encrypted (hashed) value
 */
export async function encrypt(value: string): Promise<string> {
	return hashValue(value);
}

/**
 * Verify a value against a hash (alias for compareHash)
 * @param value - The value to verify
 * @param hash - The hash to verify against
 * @returns true if the value matches the hash, false otherwise
 */
export async function verify(value: string, hash: string): Promise<boolean> {
	return compareHash(value, hash);
}
