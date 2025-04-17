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
exports.ResetPasswordRepository = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("./base.repository");
const json_db_service_1 = require("../database/json-db.service");
const reset_password_util_1 = require("../common/utils/reset_password.util");
let ResetPasswordRepository = class ResetPasswordRepository extends base_repository_1.BaseRepository {
    jsonDbService;
    constructor(jsonDbService) {
        super(jsonDbService, 'reset_password_tokens');
        this.jsonDbService = jsonDbService;
    }
    async findByEmail(email) {
        return this.findByField('email', email.trim());
    }
    async createOrUpdateToken(email, newPassword) {
        const { token, exp } = (0, reset_password_util_1.generateResetPasswordToken)(email);
        const resetTokenData = {
            id: email.trim(),
            email: email.trim(),
            newPassword: newPassword.trim(),
            token: token,
            exp: exp,
        };
        const existingToken = await this.findByEmail(email);
        if (existingToken) {
            await this.deleteById(email);
        }
        return await this.create(resetTokenData);
    }
    async delete(email) {
        return await this.deleteByField('email', email);
    }
};
exports.ResetPasswordRepository = ResetPasswordRepository;
exports.ResetPasswordRepository = ResetPasswordRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [json_db_service_1.JsonDbService])
], ResetPasswordRepository);
//# sourceMappingURL=reset_password.repository.js.map