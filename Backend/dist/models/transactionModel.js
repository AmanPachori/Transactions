"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTypeEnum = exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../utils/enum");
Object.defineProperty(exports, "TransactionTypeEnum", { enumerable: true, get: function () { return enum_1.TransactionTypeEnum; } });
const TransactionSchema = new mongoose_1.Schema({
    transactionId: { type: String, required: true, unique: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: mongoose_1.Schema.Types.String, required: true },
    type: {
        type: String,
        enum: Object.values(enum_1.TransactionTypeEnum),
        required: true,
    },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    datetime: { type: Date, required: true, default: Date.now },
});
TransactionSchema.index({ userId: 1 });
TransactionSchema.index({ type: 1, datetime: -1 });
TransactionSchema.index({ amount: 1 });
const Transaction = (0, mongoose_1.model)("Transaction", TransactionSchema);
exports.Transaction = Transaction;
