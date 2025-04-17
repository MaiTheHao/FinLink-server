import { DatabaseInterface } from 'src/database/database.interface';
import { JsonDbService } from 'src/database/json-db.service';
export declare class BaseRepository<T extends {
    id: string;
}> {
    protected jsonDbService: JsonDbService;
    protected db: DatabaseInterface;
    protected collection: string;
    constructor(jsonDbService: JsonDbService, collection: string);
    protected findAll(): Promise<T[]>;
    protected findById(id: string): Promise<T | null>;
    protected findByField(field: keyof T, value: any): Promise<T | null>;
    protected findAllByField(field: keyof T, value: any): Promise<T[]>;
    protected create(data: Partial<T>): Promise<T>;
    protected update(id: string, data: Partial<T>): Promise<T>;
    protected deleteById(id: string): Promise<boolean>;
    protected deleteByField(field: keyof T, value: any): Promise<boolean>;
}
