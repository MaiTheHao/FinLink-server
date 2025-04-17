import { BaseRepository } from './base.repository';
import { ResetPasswordToken } from 'src/entities/reset_password_token.entity';
import { JsonDbService } from 'src/database/json-db.service';
export declare class ResetPasswordRepository extends BaseRepository<ResetPasswordToken> {
    protected jsonDbService: JsonDbService;
    constructor(jsonDbService: JsonDbService);
    findByEmail(email: string): Promise<ResetPasswordToken | null>;
    createOrUpdateToken(email: string, newPassword: string): Promise<ResetPasswordToken>;
    delete(email: string): Promise<boolean>;
}
