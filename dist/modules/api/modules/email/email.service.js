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
let EmailService = class EmailService {
    mailer;
    constructor(mailer) {
        this.mailer = mailer;
    }
    async sendVerificationEmail(email, token) {
        const FRONTEND_URL = process.env.FRONTEND_URL;
        if (!FRONTEND_URL) {
            throw new common_1.BadRequestException('Frontend URL not set in environment variables');
        }
        const verificationLink = `${FRONTEND_URL}/auth/verify-email?token=${token}&email=${email}`;
        try {
            await this.mailer.sendMail({
                to: email,
                subject: '🔒 Email Verification - FinLink',
                text: `Please verify your email using this link: ${verificationLink}`,
                html: `
                  <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Verify your email</h2>
                    <p>Hello <strong>${email}</strong>,</p>
                    <p>Please click the link below to verify your email address:</p>
                    <p style="margin: 10px 0;">${verificationLink}</p>
                    <a href="${verificationLink}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">
                      Verify Email
                    </a>
                    <p style="margin-top: 20px;">If you did not request this, you can safely ignore this email.</p>
                  </div>
                `,
            });
        }
        catch (err) {
            console.error('Error sending email:', err);
            throw new common_1.BadRequestException('Failed to send email verification');
        }
    }
    async sendPasswordResetEmail(email, token) {
        const FRONTEND_URL = process.env.FRONTEND_URL;
        if (!FRONTEND_URL) {
            throw new common_1.BadRequestException('Frontend URL not set in environment variables');
        }
        const resetLink = `${FRONTEND_URL}/auth/verify-reset-password?token=${token}&email=${email}`;
        try {
            await this.mailer.sendMail({
                to: email,
                subject: '🔒 Password Reset - FinLink',
                text: `Reset your password using this link: ${resetLink}`,
                html: `
                  <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Reset your password</h2>
                    <p>Hello <strong>${email}</strong>,</p>
                    <p>Please click the link below to reset your password:</p>
                    <p style="margin: 10px 0;">${resetLink}</p>
                    <a href="${resetLink}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">
                      Reset Password
                    </a>
                    <p style="margin-top: 20px;">If you did not request this, you can safely ignore this email.</p>
                  </div>
                `,
            });
        }
        catch (err) {
            console.error('Error sending password reset email:', err);
            throw new common_1.BadRequestException('Failed to send password reset email');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map