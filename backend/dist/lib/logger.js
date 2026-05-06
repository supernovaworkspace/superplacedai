"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = logActivity;
function logActivity(user_id, action, metadata) {
    return {
        user_id,
        action,
        metadata,
        created_at: new Date().toISOString(),
    };
}
