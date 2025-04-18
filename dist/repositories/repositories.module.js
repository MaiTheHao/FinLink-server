"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoriesModule = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./json/user.repository");
const database_module_1 = require("../database/database.module");
const reset_password_repository_1 = require("./json/reset_password.repository");
const email_verification_repository_1 = require("./json/email_verification.repository");
const mongo_user_repository_1 = require("./mongo/mongo-user.repository");
const json_log_repository_1 = require("./json/json-log.repository");
let RepositoriesModule = class RepositoriesModule {
};
exports.RepositoriesModule = RepositoriesModule;
exports.RepositoriesModule = RepositoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [
            user_repository_1.UserRepository,
            reset_password_repository_1.ResetPasswordRepository,
            email_verification_repository_1.EmailVerificationRepository,
            json_log_repository_1.JsonLogRepository,
            mongo_user_repository_1.MongoUserRepository,
        ],
        exports: [
            user_repository_1.UserRepository,
            reset_password_repository_1.ResetPasswordRepository,
            email_verification_repository_1.EmailVerificationRepository,
            json_log_repository_1.JsonLogRepository,
            mongo_user_repository_1.MongoUserRepository,
        ],
    })
], RepositoriesModule);
//# sourceMappingURL=repositories.module.js.map