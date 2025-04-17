export declare function hashValue(value: string): Promise<string>;
export declare function compareHash(value: string, hashedValue: string): Promise<boolean>;
export declare function isBcryptHash(hash: string): boolean;
export declare function encrypt(value: string): Promise<string>;
export declare function verify(value: string, hash: string): Promise<boolean>;
