import * as mongoose from 'mongoose';
import { ResetPassword } from '../interfaces/reset_password.interface';

const ResetPasswordSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	token: { type: String, required: true },
	newPassword: { type: String, required: true },
	exp: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
});

ResetPasswordSchema.pre('save', function (next) {
	if (this.isNew) {
		this._id = this.get('email');
	}
	next();
});

ResetPasswordSchema.virtual('email')
	.get(function () {
		return this._id;
	})
	.set(function (email) {
		this._id = email;
	});

export { ResetPasswordSchema };
export type ResetPasswordDocument = mongoose.Document & ResetPassword;
