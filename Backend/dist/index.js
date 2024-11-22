"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const userRoute_1 = __importDefault(require("./router/userRoute"));
const transactionRoute_1 = __importDefault(require("./router/transactionRoute"));
const cronRoute_1 = __importDefault(require("./router/cronRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
app.use("/api/user", userRoute_1.default);
app.use("/api/transaction", transactionRoute_1.default);
app.use("/api/cron", cronRoute_1.default);
(0, dbConfig_1.default)();
