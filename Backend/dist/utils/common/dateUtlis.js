"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDate = void 0;
const validateDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
};
exports.validateDate = validateDate;
