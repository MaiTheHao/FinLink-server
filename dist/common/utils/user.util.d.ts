import { User } from 'src/entities/interfaces/user.interface';
export declare function getSafeUserDetail(user: User): Omit<User, '_id' | 'password' | 'createdAt' | 'updatedAt' | 'IsEmailVerified'>;
export declare function getSafeUserEmailAndPassword(user: User): Pick<User, 'email' | 'password'>;
export declare function getSafeUserId(user: User): Pick<User, '_id'>;
export declare function getSafeUserIdAndEmail(user: User): Pick<User, '_id' | 'email'>;
export declare function getSafeUserIdAndEmailAndPassword(user: User): Pick<User, '_id' | 'email' | 'password'>;
