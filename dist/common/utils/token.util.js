"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.isTokenExpired = isTokenExpired;
exports.validateToken = validateToken;
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
function generateToken(identifier, expirationMs) {
    const timestamp = Date.now();
    const randomValue = (0, uuid_1.v4)();
    const data = `${identifier}:${timestamp}:${randomValue}`;
    const token = (0, crypto_1.createHash)('sha256').update(data).digest('hex');
    const exp = timestamp + expirationMs;
    return { token, exp };
}
function isTokenExpired(exp) {
    if (!exp)
        return true;
    return Date.now() > exp;
}
function validateToken(stored, inputToken, identifier) {
    if (!stored.identifier || !stored.token)
        return false;
    if (stored.identifier !== identifier)
        return false;
    if (isTokenExpired(stored.exp))
        return false;
    const storedBuffer = Buffer.from(stored.token.trim());
    const inputBuffer = Buffer.from(inputToken.trim());
    if (storedBuffer.length !== inputBuffer.length)
        return false;
    return (0, crypto_1.timingSafeEqual)(storedBuffer, inputBuffer);
}
//# sourceMappingURL=token.util.js.map