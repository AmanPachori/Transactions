"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Missing or invalid token",
        });
    }
    const token = authHeader.split(" ")[1]; // Extract the token part
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        if (!decodedToken.id || !decodedToken.email) {
            throw new Error("Invalid token payload");
        }
        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
        };
        next();
    }
    catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(403).json({
            message: "Access denied: invalid or expired token",
        });
    }
};
exports.authMiddleware = authMiddleware;
