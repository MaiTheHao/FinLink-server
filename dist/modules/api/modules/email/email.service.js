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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const network_util_1 = require("../../../../common/utils/network.util");
let EmailService = class EmailService {
    mailer;
    constructor(mailer) {
        this.mailer = mailer;
    }
    async sendVerificationEmail(email, token) {
        const FRONTEND_URL = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : (0, network_util_1.createServerUrl)();
        if (!FRONTEND_URL) {
            throw new common_1.BadRequestException('Chưa cấu hình FRONTEND_URL trong biến môi trường');
        }
        const verificationLink = `${FRONTEND_URL}/auth/verify-email?token=${token}&email=${email}`;
        try {
            await this.mailer.sendMail({
                to: email,
                subject: '🔒 Xác thực email - FinLink',
                text: `Vui lòng xác thực email của bạn bằng liên kết sau: ${verificationLink}`,
                html: `
				  <div style="font-family: sans-serif; padding: 20px;">
					<h2>Xác thực email của bạn</h2>
					<p>Xin chào <strong>${email}</strong>,</p>
					<p>Vui lòng nhấn vào liên kết bên dưới để xác thực địa chỉ email của bạn:</p>
					<a href="${verificationLink}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">
					  Xác thực email
					</a>
					<p style="margin-top: 20px;">Nếu bạn không yêu cầu điều này, hãy bỏ qua email này.</p>
				  </div>
				`,
            });
        }
        catch (err) {
            throw new common_1.BadRequestException('Gửi email xác thực thất bại');
        }
    }
    async sendPasswordResetEmail(email, token) {
        const FRONTEND_URL = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : (0, network_util_1.createServerUrl)();
        if (!FRONTEND_URL) {
            throw new common_1.BadRequestException('Chưa cấu hình FRONTEND_URL trong biến môi trường');
        }
        const resetLink = `${FRONTEND_URL}/auth/verify-reset-password?token=${token}&email=${email}`;
        try {
            await this.mailer.sendMail({
                to: email,
                subject: '🔒 Đặt lại mật khẩu - FinLink',
                text: `Đặt lại mật khẩu của bạn bằng liên kết sau: ${resetLink}`,
                html: `
				  <div style="font-family: sans-serif; padding: 20px;">
					<h2>Đặt lại mật khẩu</h2>
					<p>Xin chào <strong>${email}</strong>,</p>
					<p>Vui lòng nhấn vào liên kết bên dưới để đặt lại mật khẩu:</p>
					<a href="${resetLink}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">
					  Đặt lại mật khẩu
					</a>
					<p style="margin-top: 20px;">Nếu bạn không yêu cầu điều này, hãy bỏ qua email này.</p>
				  </div>
				`,
            });
        }
        catch (err) {
            throw new common_1.BadRequestException('Gửi email đặt lại mật khẩu thất bại');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map