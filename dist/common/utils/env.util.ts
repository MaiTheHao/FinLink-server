export function getEnvString(key: string, defaultValue: string): string {
	const value = process.env[key];
	if (value === undefined) {
		return defaultValue;
	}
	return value;
}

export function getEnvNumber(key: string, defaultValue: number): number {
	const value = process.env[key];
	if (value === undefined) {
		return defaultValue;
	}
	const parsedValue = parseInt(value, 10);
	if (isNaN(parsedValue)) {
		return defaultValue;
	}
	return parsedValue;
}

export function getEnvBoolean(key: string, defaultValue: boolean): boolean {
	const value = process.env[key];
	if (value === undefined) {
		return defaultValue;
	}
	if (value.toLowerCase() === 'true') {
		return true;
	}
	if (value.toLowerCase() === 'false') {
		return false;
	}
	return defaultValue;
}
