export interface DatabaseInterface {
    findAll(collection: string): Promise<any[]>;
    findById(collection: string, id: string): Promise<any>;
    findByField(collection: string, field: string, value: any): Promise<any>;
    findAllByField(collection: string, field: string, value: any): Promise<any[]>;
    insertOne(collection: string, data: any): Promise<any>;
    updateOne(collection: string, id: string, data: any): Promise<any>;
    deleteOne(collection: string, id: string): Promise<boolean>;
    countDocuments(collection: string): Promise<number>;
    exists(collection: string, query: Record<string, any>): Promise<boolean>;
}
