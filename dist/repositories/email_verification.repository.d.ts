import { BaseRepository } from './base.repository';
import { EmailVerification } from 'src/entities/email_verification';
import { JsonDbService } from 'src/database/json-db.service';
export declare class EmailVerificationRepository extends BaseRepository<EmailVerification> {
    protected jsonDbService: JsonDbService;
    constructor(jsonDbService: JsonDbService);
    findByEmail(email: string): Promise<EmailVerification | null>;
    createOrUpdate(email: string): Promise<EmailVerification>;
    delete(email: string): Promise<void>;
}
