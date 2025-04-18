import { ManualErrorCode } from 'src/common/constants/error/error-codes.constant';

/**
 * Error-Result tuple pattern
 * Returns a tuple of [error, result]
 * where error is null if operation succeeds
 */
export type ErrorFirstResult<T = any> = [CustomError | null, T | null];

/**
 * Extended error interface with common additional properties
 */
export interface CustomError {
	code: ManualErrorCode;
	message: string;
	statusCode?: number;
	original?: unknown;
}
