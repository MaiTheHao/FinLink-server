export interface EmailVerification {
	id: string;
	email: string;
	token: string;
	exp: number;
	createdAt: Date;
	updatedAt: Date;
}
