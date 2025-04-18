export interface ResetPassword {
	_id: string;
	email: string;
	token: string;
	newPassword: string;
	exp: number;
	createdAt: Date;
}
