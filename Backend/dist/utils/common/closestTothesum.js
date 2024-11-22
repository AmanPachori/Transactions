"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeToSumTransaction = void 0;
const closeToSumTransaction = (transactions, totalAmount) => {
    const n = transactions.length;
    const sortedTransactions = [...transactions].sort((a, b) => a.amount - b.amount);
    let closest = 0;
    let closestSet = [];
    const SubSet = (index, currSum, currSet) => {
        if (currSum > totalAmount)
            return;
        if (currSum > closest) {
            closest = currSum;
            closestSet = [...currSet];
        }
        for (let i = index; i < n; i++) {
            SubSet(i + 1, currSum + sortedTransactions[i].amount, [
                ...currSet,
                sortedTransactions[i],
            ]);
        }
    };
    SubSet(0, 0, []);
    return { transactions: closestSet, total: closest };
};
exports.closeToSumTransaction = closeToSumTransaction;
