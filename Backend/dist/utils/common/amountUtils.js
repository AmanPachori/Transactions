"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAmount = void 0;
const parseAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return isNaN(parsedAmount) ? null : parsedAmount;
};
exports.parseAmount = parseAmount;
