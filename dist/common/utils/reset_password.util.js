"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetPasswordToken = generateResetPasswordToken;
exports.isTokenExpired = isTokenExpired;
exports.validateResetPasswordToken = validateResetPasswordToken;
const token_util_1 = require("./token.util");
const env_util_1 = require("./env.util");
const getTokenExp = () => (0, env_util_1.getEnvNumber)('RESET_PASSWORD_TOKEN_EXPIRATION_MS', 3600000);
function generateResetPasswordToken(email) {
    return (0, token_util_1.generateToken)(email, getTokenExp());
}
function isTokenExpired(token) {
    return (0, token_util_1.isTokenExpired)(token.exp);
}
function validateResetPasswordToken(storedToken, inputToken, email) {
    return (0, token_util_1.validateToken)({ identifier: storedToken.email, token: storedToken.token, exp: storedToken.exp }, inputToken, email);
}
//# sourceMappingURL=reset_password.util.js.map