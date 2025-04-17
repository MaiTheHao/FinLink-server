import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailer;
    constructor(mailer: MailerService);
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
}
