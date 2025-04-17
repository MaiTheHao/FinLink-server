import { User } from 'src/entities/user.entity';

export function getSafeUserDetail(user: User): Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'> {
	const { id, password, createdAt, updatedAt, ...safeUser } = user;
	return safeUser;
}
