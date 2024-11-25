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
exports.generateTransactions = exports.searchTransactions = exports.getTransactionById = exports.createTransaction = void 0;
const transactionModel_1 = require("../models/transactionModel");
const enum_1 = require("../utils/enum");
const userModel_1 = __importDefault(require("../models/userModel"));
const dateUtlis_1 = require("../utils/common/dateUtlis");
const errorsUtils_1 = require("../utils/common/errorsUtils");
const amountUtils_1 = require("../utils/common/amountUtils");
const closestTothesum_1 = require("../utils/common/closestTothesum");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { type, amount, description } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return (0, errorsUtils_1.handleError)(res, "Unauthorized User Please Signin Again", 401);
    }
    try {
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return (0, errorsUtils_1.handleError)(res, "User not found", 404);
        }
        const transactionId = `${Math.floor(Math.random() * 100000)}`;
        const transaction = new transactionModel_1.Transaction({
            transactionId,
            userId,
            userName: user === null || user === void 0 ? void 0 : user.name,
            type: type || enum_1.TransactionTypeEnum.DEPOSIT,
            amount,
            description,
            datetime: new Date(),
        });
        const savedTransaction = yield transaction.save();
        res.status(201).json({
            message: "Transaction created successfully",
            transaction: savedTransaction,
        });
    }
    catch (error) {
        (0, errorsUtils_1.handleError)(res, "Error creating transaction");
    }
});
exports.createTransaction = createTransaction;
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const transactionId = req.params.id;
    if (!userId) {
        return (0, errorsUtils_1.handleError)(res, "Unauthorized User Please Signin Again", 401);
    }
    try {
        const transaction = yield transactionModel_1.Transaction.findOne({ transactionId });
        if (!transaction) {
            return (0, errorsUtils_1.handleError)(res, "Transaction not found or Unauthorized Access", 404);
        }
        res.status(200).json({
            message: "Transaction fetched successfully",
            transaction,
        });
    }
    catch (error) {
        (0, errorsUtils_1.handleError)(res, "Error fetching transaction by ID");
    }
});
exports.getTransactionById = getTransactionById;
const searchTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userId, transactionId, amount, startDate, endDate, description, page, limit, } = req.query;
    let query = {};
    if (amount)
        query.amount = (0, amountUtils_1.parseAmount)(amount);
    if (startDate || endDate) {
        query.datetime = {};
        if (startDate)
            query.datetime.$gte = (0, dateUtlis_1.validateDate)(startDate);
        if (endDate)
            query.datetime.$lte = (0, dateUtlis_1.validateDate)(endDate);
    }
    if (description)
        query.description = { $regex: description, $options: "i" };
    if (userName)
        query.userName = userName;
    if (userId)
        query.userId = userId;
    if (transactionId)
        query.transactionId = transactionId;
    console.log(query);
    let transactions;
    let totalTransactions;
    if (page && limit) {
        const pgNo = parseInt(page, 10) || 1;
        const pgSize = parseInt(limit, 10) || 10;
        const skip = (pgNo - 1) * pgSize;
        transactions = yield transactionModel_1.Transaction.find(query).skip(skip).limit(pgSize);
        totalTransactions = yield transactionModel_1.Transaction.countDocuments(query);
        if (totalTransactions) {
            return (0, errorsUtils_1.handleError)(res, "No transactions found", 404);
        }
        res.status(200).json({
            message: "Transactions fetched successfully",
            data: {
                transactions,
                pagination: {
                    totalTransactions,
                    currentPage: pgNo,
                    totalPages: Math.ceil(totalTransactions / pgSize),
                    pgSize,
                },
            },
        });
    }
    else {
        try {
            transactions = yield transactionModel_1.Transaction.find(query);
            if (transactions.length === 0) {
                return (0, errorsUtils_1.handleError)(res, "No transactions found", 404);
            }
            res.status(200).json({
                message: "Transactions fetched successfully",
                transactions,
            });
        }
        catch (error) {
            (0, errorsUtils_1.handleError)(res, "Error searching transactions");
        }
    }
});
exports.searchTransactions = searchTransactions;
const generateTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, amount } = req.query;
    const stage = {};
    const maxAmount = amount ? (0, amountUtils_1.parseAmount)(amount) : null;
    try {
        if (startDate || endDate) {
            stage.datetime = {};
            if (startDate)
                stage.datetime.$gte = (0, dateUtlis_1.validateDate)(startDate);
            if (endDate)
                stage.datetime.$lte = (0, dateUtlis_1.validateDate)(endDate);
        }
        const pipeline = [
            { $match: stage },
            {
                $group: {
                    _id: null,
                    totalTransactions: { $sum: 1 },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalTransactions: 1,
                    totalAmount: 1,
                },
            },
        ];
        const reportSummary = yield transactionModel_1.Transaction.aggregate(pipeline);
        const transactions = yield transactionModel_1.Transaction.find(stage);
        if (maxAmount) {
            const result = (0, closestTothesum_1.closeToSumTransaction)(transactions, maxAmount);
            res.status(200).json({
                message: "Transaction report generated successfully",
                report: {
                    totalTransactions: result === null || result === void 0 ? void 0 : result.transactions.length,
                    SumAmount: result === null || result === void 0 ? void 0 : result.total,
                },
                transactions: result === null || result === void 0 ? void 0 : result.transactions,
            });
        }
        else {
            res.status(200).json({
                message: "Transaction report generated successfully",
                report: reportSummary[0] || { totalTransactions: 0, totalAmount: 0 },
                transactions,
            });
        }
    }
    catch (error) {
        (0, errorsUtils_1.handleError)(res, "Error generating transaction report");
    }
});
exports.generateTransactions = generateTransactions;
