"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, message, status = 500) => {
    console.error(message); // Log the error for debugging
    res.status(status).json({ message }); // Respond with a JSON error message
};
exports.handleError = handleError;
