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
const user_repository_1 = require("../../../../repositories/json/user.repository");
const user_util_1 = require("../../../../common/utils/user.util");
const password_util_1 = require("../../../../common/utils/password.util");
const hash_util_1 = require("../../../../common/utils/hash.util");
const mongo_user_repository_1 = require("../../../../repositories/mongo/mongo-user.repository");
let UserService = class UserService {
    userRepository;
    mongoUserRepository;
    constructor(userRepository, mongoUserRepository) {
        this.userRepository = userRepository;
        this.mongoUserRepository = mongoUserRepository;
    }
    async findByEmail(email) {
        const user = await this.mongoUserRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với email ${email}.`);
        }
        return user;
    }
    async findById(id) {
        const user = await this.mongoUserRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
        }
        return user;
    }
    async findUserWithPassword(email) {
        const user = await this.mongoUserRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với email ${email}.`);
        }
        return (0, user_util_1.getSafeUserEmailAndPassword)(user);
    }
    async updateProfile(id, data) {
        const user = await this.mongoUserRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng này.`);
        }
        return this.mongoUserRepository.update(id, data);
    }
    async createUser(userData) {
        const hashedPassword = await (0, password_util_1.hashPassword)(userData.password);
        const newUser = await this.mongoUserRepository.create({
            ...userData,
            password: hashedPassword,
        });
        return newUser;
    }
    async setEmailVerified(id, isVerified = true) {
        const user = await this.mongoUserRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID ${id}.`);
        }
        const updatedUser = await this.mongoUserRepository.update(id, { IsEmailVerified: isVerified });
        if (!updatedUser) {
            throw new common_1.NotFoundException(`Lỗi trong quá trình cập nhật xác thực email`);
        }
        return updatedUser;
    }
    async updateUserPassword(id, newPassword) {
        const hashedPassword = await (0, password_util_1.hashPassword)(newPassword);
        const updatedUser = await this.mongoUserRepository.update(id, { password: hashedPassword });
        if (!updatedUser) {
            throw new common_1.NotFoundException(`Không thể cập nhật mật khẩu cho người dùng với ID ${id}.`);
        }
        return updatedUser;
    }
    async verifyPassword(plainPassword, hashedPassword) {
        if (!(0, hash_util_1.isBcryptHash)(hashedPassword)) {
            return false;
        }
        const isMatch = await (0, password_util_1.comparePassword)(plainPassword, hashedPassword);
        return isMatch;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        mongo_user_repository_1.MongoUserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map