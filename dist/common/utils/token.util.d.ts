export declare function generateToken(identifier: string, expirationMs: number): {
    token: string;
    exp: number;
};
export declare function isTokenExpired(exp?: number): boolean;
export declare function validateToken(stored: {
    identifier: string;
    token: string;
    exp: number;
}, inputToken: string, identifier: string): boolean;
