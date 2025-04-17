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
exports.ResetPasswordDto = void 0;
const class_validator_1 = require("class-validator");
const validation_messages_constant_1 = require("../../../../../common/constants/validation-messages.constant");
class ResetPasswordDto {
    email;
    newPassword;
    confirmPassword;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_messages_constant_1.AuthValidationMessages.EMAIL_REQUIRED }),
    (0, class_validator_1.IsEmail)({}, { message: validation_messages_constant_1.AuthValidationMessages.EMAIL_VALID }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_messages_constant_1.PasswordMessages.PASSWORD_NEW_REQUIRED }),
    (0, class_validator_1.IsString)({ message: validation_messages_constant_1.PasswordMessages.PASSWORD_NEW_STRING }),
    (0, class_validator_1.IsStrongPassword)({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 }, { message: validation_messages_constant_1.PasswordMessages.PASSWORD_NEW_PATTERN }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: validation_messages_constant_1.PasswordMessages.PASSWORD_CONFIRM_REQUIRED }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "confirmPassword", void 0);
//# sourceMappingURL=reset_password.dto.js.map