import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/entities/user.entity';
import { UserRegister } from '../auth/interfaces/user.register.interface';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findByEmail(email: string): Promise<Omit<User, "password" | "id" | "createdAt" | "updatedAt">>;
    findById(id: string): Promise<Omit<User, "password" | "id" | "createdAt" | "updatedAt">>;
    updateProfile(id: string, data: any): Promise<User>;
    createUser(userData: UserRegister): Promise<User>;
    findUserWithPassword(email: string): Promise<User>;
    setEmailVerified(id: string, isVerified?: boolean): Promise<User>;
    updateUserPassword(id: string, newPassword: string): Promise<User>;
    verifyPassword(user: User, password: string): Promise<boolean>;
}
