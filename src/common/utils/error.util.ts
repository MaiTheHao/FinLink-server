import { CustomError } from 'src/entities/interfaces/error.interface';
import { ManualErrorCode, MongoErrorCode } from '../constants/error/error-codes.constant';
import { ErrorHttpStatusCode, MongoErrorCodeMapping } from '../constants/error/error-mappings.constant';
import { isEmpty } from 'lodash';

/**
 * Creates a custom error object
 * @param code The error code
 * @param message The error message
 * @param original The original error object
 * @param statusCode The HTTP status code
 * @returns The custom error object
 */
export const createCustomError = (
	code: ManualErrorCode,
	message: string,
	original?: unknown,
	statusCode?: number | null
): CustomError => {
	return {
		code,
		message,
		original,
		statusCode: statusCode || ErrorHttpStatusCode[code] || 500,
	};
};

/**
 * Extracts and maps MongoDB error codes from a CustomError object
 * @param error The custom error object potentially containing a MongoDB error
 * @returns The mapped MongoDB error code or null if not found
 */
export const getMongoErrorCode = (error: CustomError): MongoErrorCode | null => {
	if (isEmpty(error?.original)) return null;

	const originalError = error.original as { code?: string | number };
	const errorCode = originalError?.code;

	if (isEmpty(errorCode)) return null;

	return MongoErrorCodeMapping[String(errorCode)] || null;
};
