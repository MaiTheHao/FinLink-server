import { User } from 'src/entities/interfaces/user.interface';

export function getSafeUserDetail(
	user: User
): Omit<User, '_id' | 'password' | 'createdAt' | 'updatedAt' | 'IsEmailVerified'> {
	const { _id, password, createdAt, updatedAt, ...safeUser } = user;
	return safeUser;
}

export function getSafeUserEmailAndPassword(user: User): Pick<User, 'email' | 'password'> {
	const { email, password } = user;
	return { email, password };
}

export function getSafeUserId(user: User): Pick<User, '_id'> {
	const { _id } = user;
	return { _id };
}

export function getSafeUserIdAndEmail(user: User): Pick<User, '_id' | 'email'> {
	const { _id, email } = user;
	return { _id, email };
}

export function getSafeUserIdAndEmailAndPassword(user: User): Pick<User, '_id' | 'email' | 'password'> {
	const { _id, email, password } = user;
	return { _id, email, password };
}
