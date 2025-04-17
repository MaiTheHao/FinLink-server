"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailVerificationToken = generateEmailVerificationToken;
exports.isEmailVerificationTokenExpired = isEmailVerificationTokenExpired;
exports.validateEmailVerificationToken = validateEmailVerificationToken;
const token_util_1 = require("./token.util");
const env_util_1 = require("./env.util");
const getTokenExp = () => (0, env_util_1.getEnvNumber)('EMAIL_VERIFICATION_TOKEN_EXPIRATION_MS', 3600000);
function generateEmailVerificationToken(email) {
    return (0, token_util_1.generateToken)(email, getTokenExp());
}
function isEmailVerificationTokenExpired(token) {
    return (0, token_util_1.isTokenExpired)(token.exp);
}
function validateEmailVerificationToken(storedToken, inputToken, email) {
    const mappedStored = {
        identifier: storedToken.email,
        token: storedToken.token,
        exp: storedToken.exp,
    };
    return (0, token_util_1.validateToken)(mappedStored, inputToken, email);
}
//# sourceMappingURL=email_verification.util.js.map