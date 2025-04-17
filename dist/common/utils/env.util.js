"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvString = getEnvString;
exports.getEnvNumber = getEnvNumber;
exports.getEnvBoolean = getEnvBoolean;
function getEnvString(key, defaultValue) {
    const value = process.env[key];
    if (value === undefined) {
        return defaultValue;
    }
    return value;
}
function getEnvNumber(key, defaultValue) {
    const value = process.env[key];
    if (value === undefined) {
        return defaultValue;
    }
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        return defaultValue;
    }
    return parsedValue;
}
function getEnvBoolean(key, defaultValue) {
    const value = process.env[key];
    if (value === undefined) {
        return defaultValue;
    }
    if (value.toLowerCase() === 'true') {
        return true;
    }
    if (value.toLowerCase() === 'false') {
        return false;
    }
    return defaultValue;
}
//# sourceMappingURL=env.util.js.map