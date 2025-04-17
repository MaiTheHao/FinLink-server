"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../../../repositories/user.repository");
const user_util_1 = require("../../../../common/utils/user.util");
const password_util_1 = require("../../../../common/utils/password.util");
const hash_util_1 = require("../../../../common/utils/hash.util");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với email ${email}.`);
        }
        return (0, user_util_1.getSafeUserDetail)(user);
    }
    async findById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
        }
        return (0, user_util_1.getSafeUserDetail)(user);
    }
    async updateProfile(id, data) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng này.`);
        }
        return this.userRepository.update(id, { ...user, ...data });
    }
    async createUser(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new common_1.ConflictException(`Email ${userData.email} đã tồn tại.`);
        }
        const hashedPassword = await (0, password_util_1.hashPassword)(userData.password);
        const newUser = await this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });
        return newUser;
    }
    async findUserWithPassword(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với email ${email}.`);
        }
        return user;
    }
    async setEmailVerified(id, isVerified = true) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
        }
        return this.userRepository.update(id, { ...user, isEmailVerified: isVerified });
    }
    async updateUserPassword(id, newPassword) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
        }
        const hashedPassword = await (0, password_util_1.hashPassword)(newPassword);
        return this.userRepository.update(id, { ...user, password: hashedPassword });
    }
    async verifyPassword(user, password) {
        if (!user || !(0, hash_util_1.isBcryptHash)(user.password)) {
            return false;
        }
        return (0, password_util_1.comparePassword)(password, user.password);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map