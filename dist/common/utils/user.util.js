"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSafeUserDetail = getSafeUserDetail;
exports.getSafeUserEmailAndPassword = getSafeUserEmailAndPassword;
exports.getSafeUserId = getSafeUserId;
exports.getSafeUserIdAndEmail = getSafeUserIdAndEmail;
exports.getSafeUserIdAndEmailAndPassword = getSafeUserIdAndEmailAndPassword;
function getSafeUserDetail(user) {
    const { _id, password, createdAt, updatedAt, ...safeUser } = user;
    return safeUser;
}
function getSafeUserEmailAndPassword(user) {
    const { email, password } = user;
    return { email, password };
}
function getSafeUserId(user) {
    const { _id } = user;
    return { _id };
}
function getSafeUserIdAndEmail(user) {
    const { _id, email } = user;
    return { _id, email };
}
function getSafeUserIdAndEmailAndPassword(user) {
    const { _id, email, password } = user;
    return { _id, email, password };
}
//# sourceMappingURL=user.util.js.map