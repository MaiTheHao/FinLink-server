export interface EmailVerification {
	_id: string;
	email: string;
	token: string;
	exp: number;
	createdAt: Date;
}
