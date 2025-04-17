import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<Omit<import("../../../../entities/user.entity").User, "password" | "id" | "createdAt" | "updatedAt">>;
    updateProfile(req: any, updateData: any): Promise<import("../../../../entities/user.entity").User>;
    getUserById(id: string): Promise<Omit<import("../../../../entities/user.entity").User, "password" | "id" | "createdAt" | "updatedAt">>;
    findByEmail(email: string): Promise<Omit<import("../../../../entities/user.entity").User, "password" | "id" | "createdAt" | "updatedAt">>;
}
