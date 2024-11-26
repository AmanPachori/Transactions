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
exports.stopCronJob = exports.startCronJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const enum_1 = require("./enum");
const transactionModel_1 = require("../models/transactionModel");
let cronJob = null;
const createTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = new transactionModel_1.Transaction({
        transactionId: Math.floor(Math.random() * 100000),
        userId: "63f9efb3c657d425287838c0",
        userName: "Cron Job user",
        type: enum_1.TransactionTypeEnum.DEPOSIT,
        amount: Math.floor(Math.random() * 1000),
        description: "deposit transaction genrated from the cron job",
        datetime: new Date(),
    });
    yield transaction.save();
});
const startCronJob = () => {
    if (!cronJob) {
        cronJob = node_cron_1.default.schedule("* * * * * *", createTransaction);
    }
    else {
        console.log("cron job already running");
    }
};
exports.startCronJob = startCronJob;
const stopCronJob = () => {
    if (cronJob) {
        cronJob.stop();
        cronJob = null;
    }
    else {
        console.log("no cron job is running");
    }
};
exports.stopCronJob = stopCronJob;
