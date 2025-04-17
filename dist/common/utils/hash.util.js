"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashValue = hashValue;
exports.compareHash = compareHash;
exports.isBcryptHash = isBcryptHash;
exports.encrypt = encrypt;
exports.verify = verify;
const bcrypt = require("bcryptjs");
async function hashValue(value) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(value, salt);
}
async function compareHash(value, hashedValue) {
    return bcrypt.compare(value, hashedValue);
}
function isBcryptHash(hash) {
    return /^\$2[aby]\$.{56}$/.test(hash);
}
async function encrypt(value) {
    return hashValue(value);
}
async function verify(value, hash) {
    return compareHash(value, hash);
}
//# sourceMappingURL=hash.util.js.map