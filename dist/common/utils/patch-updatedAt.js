"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUpdatedAt = patchUpdatedAt;
function patchUpdatedAt(item) {
    return { ...item, updatedAt: new Date() };
}
//# sourceMappingURL=patch-updatedAt.js.map