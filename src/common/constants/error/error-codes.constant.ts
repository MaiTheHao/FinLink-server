export enum ManualErrorCode {
	// 4xx
	Unauthorized = 'UNAUTHORIZED',
	AuthenticationFailed = 'AUTHENTICATION_FAILED',
	ValidationFailed = 'VALIDATION_FAILED',
	NotFound = 'NOT_FOUND',
	Conflict = 'CONFLICT',
	Duplicate = 'DUPLICATE',

	// 5xx
	DbError = 'DB_ERROR',
	CreateFailed = 'CREATE_FAILED',
	UpdateFailed = 'UPDATE_FAILED',
	InternalServerError = 'INTERNAL_SERVER_ERROR',
}

export enum MongoErrorCode {
	DuplicateKey = 'MONGO_DUPLICATE_KEY',
	WriteConflict = 'MONGO_WRITE_CONFLICT',
	Unauthorized = 'MONGO_UNAUTHORIZED',
	AuthenticationFailed = 'MONGO_AUTHENTICATION_FAILED',
	ExceededTimeLimit = 'MONGO_EXCEEDED_TIME_LIMIT',
	ImmutableField = 'MONGO_IMMUTABLE_FIELD',
	CannotCreateIndex = 'MONGO_CANNOT_CREATE_INDEX',
	CommandNotSupported = 'MONGO_COMMAND_NOT_SUPPORTED',
	UnrecognizedPipelineStageName = 'MONGO_UNRECOGNIZED_PIPELINE_STAGE_NAME',
	TooManyRequests = 'MONGO_TOO_MANY_REQUESTS',
	ExceededMemoryLimit = 'MONGO_EXCEEDED_MEMORY_LIMIT',
}
