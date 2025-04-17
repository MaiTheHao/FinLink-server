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
const user_repository_1 = require("./user.repository");
const database_module_1 = require("../database/database.module");
const reset_password_repository_1 = require("./reset_password.repository");
const email_verification_repository_1 = require("./email_verification.repository");
let RepositoriesModule = class RepositoriesModule {
};
exports.RepositoriesModule = RepositoriesModule;
exports.RepositoriesModule = RepositoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [user_repository_1.UserRepository, reset_password_repository_1.ResetPasswordRepository, email_verification_repository_1.EmailVerificationRepository],
        exports: [user_repository_1.UserRepository, reset_password_repository_1.ResetPasswordRepository, email_verification_repository_1.EmailVerificationRepository],
    })
], RepositoriesModule);
//# sourceMappingURL=repositories.module.js.map