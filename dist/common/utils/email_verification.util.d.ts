export declare function generateEmailVerificationToken(email: string): {
    token: string;
    exp: number;
};
export declare function isEmailVerificationTokenExpired(token: {
    exp: number;
}): boolean;
export declare function validateEmailVerificationToken(storedToken: {
    email: string;
    token: string;
    exp: number;
}, inputToken: string, email: string): boolean;
