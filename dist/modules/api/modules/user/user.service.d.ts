import { UserRepository } from 'src/repositories/json/user.repository';
import { User } from 'src/entities/interfaces/user.interface';
import { UserRegister } from '../auth/interfaces/user.register.interface';
import { MongoUserRepository } from 'src/repositories/mongo/mongo-user.repository';
export declare class UserService {
    private readonly userRepository;
    private readonly mongoUserRepository;
    constructor(userRepository: UserRepository, mongoUserRepository: MongoUserRepository);
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    findUserWithPassword(email: string): Promise<Pick<User, 'email' | 'password'>>;
    updateProfile(id: string, data: any): Promise<import("../../../../entities/schemas/user.schema").UserDocument | null>;
    createUser(userData: UserRegister): Promise<User>;
    setEmailVerified(id: string, isVerified?: boolean): Promise<User>;
    updateUserPassword(id: string, newPassword: string): Promise<User>;
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
