"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function mongooseConnect() {
    const url = process.env.MONGODB_URL;
    if (url) {
        mongoose_1.default.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose_1.default.connection;
        db.on("error", console.error.bind(console, "MongoDB connection error:"));
        db.once("open", () => {
            console.log("Connected to MongoDB");
        });
    }
}
exports.default = mongooseConnect;
