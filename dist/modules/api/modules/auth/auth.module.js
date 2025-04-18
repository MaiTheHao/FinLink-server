"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const database_module_1 = require("../../../../database/database.module");
const repositories_module_1 = require("../../../../repositories/repositories.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const email_module_1 = require("../email/email.module");
const user_module_1 = require("../user/user.module");
const log_module_1 = require("../../../log/log.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            repositories_module_1.RepositoriesModule,
            user_module_1.UserModule,
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (cs) => ({
                    global: true,
                    secret: cs.get('JWT_SECRET', 'secretKey'),
                    signOptions: {
                        expiresIn: cs.get('JWT_EXP', '1h'),
                    },
                }),
            }),
            email_module_1.EmailModule,
            log_module_1.LogModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map