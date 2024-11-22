"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "1h";
// User Signup Controller Function
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "This email is already registered." });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new userModel_1.default({
            name,
            email,
            password: hashedPassword,
        });
        const savedUser = yield user.save();
        res.status(201).json({
            message: "User created successfully!",
            user: savedUser,
        });
    }
    catch (error) {
        console.error("Error during signup process:", error);
        res
            .status(500)
            .json({ message: "An unexpected error occurred. Please try again." });
    }
});
exports.signup = signup;
// User Signin Controller Function
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Invalid credentials. Please check your email or password.",
            });
            return;
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                message: "Invalid credentials. Please check your email or password.",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRY,
        });
        res.status(200).json({
            message: "Login successfully completed",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Error during signin", error);
        res
            .status(500)
            .json({ message: "An unexpected error occurred. Please try again." });
    }
});
exports.signin = signin;
