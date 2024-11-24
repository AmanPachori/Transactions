"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeToSumTransaction = void 0;
const closeToSumTransaction = (transactions, totalAmount) => {
    const n = transactions.length;
    const dp = Array(totalAmount + 1).fill(null);
    dp[0] = { sum: 0, transactions: [] };
    for (const transaction of transactions) {
        const amount = transaction.amount;
        for (let currAmount = totalAmount; currAmount >= amount; currAmount--) {
            if (dp[currAmount - amount]) {
                const newSum = dp[currAmount - amount].sum + amount;
                if (!dp[currAmount] || newSum > dp[currAmount].sum) {
                    dp[currAmount] = {
                        sum: newSum,
                        transactions: [
                            ...dp[currAmount - amount].transactions,
                            transaction,
                        ],
                    };
                }
            }
        }
    }
    for (let i = totalAmount; i >= 0; i--) {
        if (dp[i]) {
            return { transactions: dp[i].transactions, total: dp[i].sum };
        }
    }
    return { transactions: [], total: 0 };
};
exports.closeToSumTransaction = closeToSumTransaction;
