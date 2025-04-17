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
exports.EmailVerificationRepository = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("./base.repository");
const json_db_service_1 = require("../database/json-db.service");
const email_verification_util_1 = require("../common/utils/email_verification.util");
let EmailVerificationRepository = class EmailVerificationRepository extends base_repository_1.BaseRepository {
    jsonDbService;
    constructor(jsonDbService) {
        super(jsonDbService, 'email_verifications');
        this.jsonDbService = jsonDbService;
    }
    async findByEmail(email) {
        return this.findByField('email', email);
    }
    async createOrUpdate(email) {
        const { token, exp } = (0, email_verification_util_1.generateEmailVerificationToken)(email);
        const newRecord = {
            id: email.trim(),
            email: email.trim(),
            token,
            exp: exp,
        };
        const existing = await this.findByEmail(email);
        if (existing) {
            await this.deleteByField('email', email);
        }
        return await super.create(newRecord);
    }
    async delete(email) {
        await this.deleteByField('email', email);
    }
};
exports.EmailVerificationRepository = EmailVerificationRepository;
exports.EmailVerificationRepository = EmailVerificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [json_db_service_1.JsonDbService])
], EmailVerificationRepository);
//# sourceMappingURL=email_verification.repository.js.map