import mongoose from 'mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema = new mongoose.Schema(
	{
		_id: { type: String, required: true },
		password: { type: String, required: true },
		username: { type: String, required: true },
		IsEmailVerified: { type: Boolean, default: false },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

// Add a pre-save hook to set the _id to email before saving
UserSchema.pre('save', function (next) {
	if (this.isNew) {
		this._id = this.get('email');
	}
	next();
});

// Virtual for email that maps to _id
UserSchema.virtual('email')
	.get(function () {
		return this._id;
	})
	.set(function (email) {
		this._id = email;
	});

export { UserSchema };

export type UserDocument = mongoose.Document & User;
