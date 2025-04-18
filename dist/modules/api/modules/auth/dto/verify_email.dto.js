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
exports.VerifyEmailDto = void 0;
const class_validator_1 = require("class-validator");
const validation_messages_constant_1 = require("../../../../../common/constants/validation_messages.constant");
class VerifyEmailDto {
    email;
    token;
}
exports.VerifyEmailDto = VerifyEmailDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_messages_constant_1.AuthValidationMessages.EMAIL_REQUIRED }),
    (0, class_validator_1.IsEmail)({}, { message: validation_messages_constant_1.AuthValidationMessages.EMAIL_VALID }),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_messages_constant_1.TokenMessages.TOKEN_REQUIRED }),
    (0, class_validator_1.IsString)({ message: validation_messages_constant_1.TokenMessages.TOKEN_STRING }),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "token", void 0);
//# sourceMappingURL=verify_email.dto.js.map