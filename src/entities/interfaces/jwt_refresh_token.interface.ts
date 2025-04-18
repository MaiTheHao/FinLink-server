export interface JwtRefreshToken {
	_id: string;
	email: string;
	token: string;
	exp: number;
	createdAt: Date;
}
