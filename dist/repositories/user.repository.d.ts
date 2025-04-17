import { User } from 'src/entities/user.entity';
import { JsonDbService } from 'src/database/json-db.service';
import { BaseRepository } from './base.repository';
export declare class UserRepository extends BaseRepository<User> {
    protected jsonDbService: JsonDbService;
    constructor(jsonDbService: JsonDbService);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    update(id: string, user: Partial<User>): Promise<User>;
}
