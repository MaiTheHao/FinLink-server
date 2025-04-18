import { ManualErrorCode, MongoErrorCode } from './error-codes.constant';

export const ErrorHttpStatusCode: Record<ManualErrorCode, number> = {
	[ManualErrorCode.NotFound]: 404,
	[ManualErrorCode.ValidationFailed]: 422,
	[ManualErrorCode.DbError]: 500,
	[ManualErrorCode.Unauthorized]: 401,
	[ManualErrorCode.Conflict]: 409,
	[ManualErrorCode.AuthenticationFailed]: 401,
	[ManualErrorCode.Duplicate]: 409,
	[ManualErrorCode.CreateFailed]: 500,
	[ManualErrorCode.UpdateFailed]: 500,
	[ManualErrorCode.InternalServerError]: 500,
};

export const MongoErrorCodeMapping: Record<number, MongoErrorCode> = {
	11000: MongoErrorCode.DuplicateKey,
	112: MongoErrorCode.WriteConflict,
	13: MongoErrorCode.Unauthorized,
	18: MongoErrorCode.AuthenticationFailed,
	50: MongoErrorCode.ExceededTimeLimit,
	66: MongoErrorCode.ImmutableField,
	67: MongoErrorCode.CannotCreateIndex,
	115: MongoErrorCode.CommandNotSupported,
	40324: MongoErrorCode.UnrecognizedPipelineStageName,
	16500: MongoErrorCode.TooManyRequests,
	16501: MongoErrorCode.ExceededMemoryLimit,
};
