import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<import("../../../../entities/interfaces/user.interface").User>;
    updateProfile(req: any, updateData: any): Promise<import("../../../../entities/schemas/user.schema").UserDocument | null>;
    getUserById(id: string): Promise<import("../../../../entities/interfaces/user.interface").User>;
    findByEmail(email: string): Promise<import("../../../../entities/interfaces/user.interface").User>;
}
