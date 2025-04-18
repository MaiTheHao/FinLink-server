export interface User {
	_id: string;
	email: string;
	password: string;
	username: string;
	IsEmailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
}
