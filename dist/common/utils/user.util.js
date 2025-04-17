"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSafeUserDetail = getSafeUserDetail;
function getSafeUserDetail(user) {
    const { id, password, createdAt, updatedAt, ...safeUser } = user;
    return safeUser;
}
//# sourceMappingURL=user.util.js.map