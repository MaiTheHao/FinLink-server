import mongoose from 'mongoose';
import { JwtRefreshToken } from '../interfaces/jwt_refresh_token.interface';

const JwtRefreshTokenSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	token: { type: String, required: true },
	exp: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
});

JwtRefreshTokenSchema.pre('save', function (next) {
	if (this.isNew) {
		this._id = this.get('email');
	}
	next();
});

JwtRefreshTokenSchema.virtual('email')
	.get(function () {
		return this._id;
	})
	.set(function (email) {
		this._id = email;
	});

export { JwtRefreshTokenSchema };
export type JwtRefreshTokenDocument = mongoose.Document & JwtRefreshToken;
