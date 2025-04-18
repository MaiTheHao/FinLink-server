import * as mongoose from 'mongoose';
import { EmailVerification } from '../interfaces/email_verification.interface';

const EmailVerificationSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	token: { type: String, required: true },
	exp: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
});

EmailVerificationSchema.pre('save', function (next) {
	if (this.isNew) {
		this._id = this.get('email');
	}
	next();
});

EmailVerificationSchema.virtual('email')
	.get(function () {
		return this._id;
	})
	.set(function (email) {
		this._id = email;
	});

export { EmailVerificationSchema };
export type EmailVerificationDocument = mongoose.Document & EmailVerification;
