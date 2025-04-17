import { User } from 'src/entities/user.entity';
export declare function getSafeUserDetail(user: User): Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;
