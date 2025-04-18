import { DatabaseInterface } from './database.interface';
export declare class JsonDbService implements DatabaseInterface {
    private getFilePath;
    private createCollection;
    private saveData;
    findAll(collection: string): Promise<any[]>;
    findById(collection: string, _id: string): Promise<any>;
    insertOne(collection: string, data: any): Promise<any>;
    updateOne(collection: string, _id: string, data: any): Promise<any>;
    deleteOne(collection: string, _id: string): Promise<boolean>;
    findByField(collection: string, field: string, value: any): Promise<any>;
    findAllByField(collection: string, field: string, value: any): Promise<any[]>;
    countDocuments(collection: string): Promise<number>;
    exists(collection: string, query: Record<string, any>): Promise<boolean>;
    clear(collection: string): Promise<void>;
}
