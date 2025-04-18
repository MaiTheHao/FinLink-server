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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const reset_password_repository_1 = require("../../../../repositories/json/reset_password.repository");
const reset_password_util_1 = require("../../../../common/utils/reset_password.util");
const jwt_1 = require("@nestjs/jwt");
const email_verification_repository_1 = require("../../../../repositories/json/email_verification.repository");
const email_verification_util_1 = require("../../../../common/utils/email_verification.util");
const email_service_1 = require("../email/email.service");
const lodash_1 = require("lodash");
let AuthService = class AuthService {
    jwtService;
    emailService;
    userService;
    resetPasswordRepository;
    emailVerificationRepository;
    constructor(jwtService, emailService, userService, resetPasswordRepository, emailVerificationRepository) {
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.userService = userService;
        this.resetPasswordRepository = resetPasswordRepository;
        this.emailVerificationRepository = emailVerificationRepository;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        try {
            const user = await this.userService.findByEmail(email);
            if ((0, lodash_1.isEmpty)(user))
                throw new common_1.NotFoundException('Người dùng không tồn tại');
            if (!user.IsEmailVerified)
                throw new common_1.ForbiddenException('Email chưa được xác thực');
            if ((0, lodash_1.isEmpty)(user.password)) {
                throw new common_1.UnauthorizedException('Tài khoản này không có mật khẩu');
            }
            const isPasswordValid = await this.userService.verifyPassword(password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Mật khẩu không chính xác');
            }
            const payload = { email: user.email, sub: user._id };
            const token = await this.jwtService.signAsync(payload);
            return { message: 'Đăng nhập thành công', access_token: token };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ForbiddenException ||
                error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Đăng nhập thất bại');
        }
    }
    async register(registerDto) {
        const { email, password, confirmPassword, username } = registerDto;
        if (password.trim() !== confirmPassword.trim()) {
            throw new common_1.BadRequestException('Xác nhận mật khẩu không khớp');
        }
        try {
            const newUser = await this.userService.createUser({
                email,
                password,
                username,
            });
            return { message: 'Đăng ký thành công', user: newUser };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.BadRequestException('Đăng ký thất bại');
        }
    }
    async requireResetPassword(resetPasswordDto) {
        const { email, newPassword, confirmPassword } = resetPasswordDto;
        if (newPassword.trim() !== confirmPassword.trim()) {
            throw new common_1.BadRequestException('Xác nhận mật khẩu không khớp');
        }
        const record = await this.resetPasswordRepository.createOrUpdateToken(email, newPassword);
        if (!record) {
            throw new common_1.InternalServerErrorException('Không thể tạo yêu cầu đặt lại mật khẩu');
        }
        await this.emailService.sendPasswordResetEmail(email, record.token);
        return { message: 'Yêu cầu đặt lại mật khẩu đã được gửi', token: record.token };
    }
    async requireVerifyEmail(email) {
        try {
            const user = await this.userService.findByEmail(email);
            if (user.IsEmailVerified) {
                throw new common_1.ConflictException('Email đã được xác thực');
            }
            const record = await this.emailVerificationRepository.createOrUpdate(email);
            if (!record) {
                throw new common_1.InternalServerErrorException('Không thể tạo yêu cầu xác thực email');
            }
            await this.emailService.sendVerificationEmail(email, record.token);
            return { message: 'Yêu cầu xác thực email đã được gửi' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.BadRequestException('Gửi yêu cầu xác thực email thất bại');
        }
    }
    async verifyResetPasswordToken(verifyResetPasswordDto) {
        const { email, token } = verifyResetPasswordDto;
        const storedToken = await this.resetPasswordRepository.findByEmail(email);
        if (!storedToken) {
            throw new common_1.NotFoundException('Không tìm thấy mã xác thực');
        }
        try {
            if (!(0, reset_password_util_1.validateResetPasswordToken)(storedToken, token, email)) {
                await this.resetPasswordRepository.delete(email);
                throw new common_1.BadRequestException('Mã xác thực không hợp lệ hoặc đã hết hạn');
            }
            const user = await this.userService.findByEmail(email);
            await Promise.all([
                this.userService.updateUserPassword(user._id, storedToken.newPassword),
                this.resetPasswordRepository.delete(email),
            ]);
            return { message: 'Đặt lại mật khẩu thành công' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Xác thực đặt lại mật khẩu thất bại');
        }
    }
    async verifyEmailToken(verifyEmailDto) {
        const { token, email } = verifyEmailDto;
        const record = await this.emailVerificationRepository.findByEmail(email);
        if (!record) {
            throw new common_1.NotFoundException('Không tìm thấy yêu cầu xác thực, có thể đã hết hạn hoặc chưa từng tồn tại');
        }
        try {
            const user = await this.userService.findByEmail(email);
            if (user.IsEmailVerified) {
                throw new common_1.ConflictException('Email đã được xác thực');
            }
            if (!(0, email_verification_util_1.validateEmailVerificationToken)(record, token, email)) {
                await this.emailVerificationRepository.delete(email);
                throw new common_1.BadRequestException('Mã xác thực không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu lại.');
            }
            await Promise.all([
                this.userService.setEmailVerified(user._id, true),
                this.emailVerificationRepository.delete(email),
            ]);
            return { message: 'Xác thực email thành công' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Xác thực email thất bại');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        email_service_1.EmailService,
        user_service_1.UserService,
        reset_password_repository_1.ResetPasswordRepository,
        email_verification_repository_1.EmailVerificationRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map