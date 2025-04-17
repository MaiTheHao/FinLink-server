"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const hash_util_1 = require("./hash.util");
async function hashPassword(password) {
    return (0, hash_util_1.hashValue)(password);
}
async function comparePassword(password, hashedPassword) {
    return (0, hash_util_1.compareHash)(password, hashedPassword);
}
//# sourceMappingURL=password.util.js.map