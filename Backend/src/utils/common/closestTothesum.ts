import { ITransaction } from "../../models/transactionModel";

type Output = {
  transactions: ITransaction[];
  total: number;
};

export const closeToSumTransaction = (
  transactions: ITransaction[],
  totalAmount: number
): Output => {
  const n = transactions.length;

  const sortedTransactions = [...transactions].sort(
    (a, b) => a.amount - b.amount
  );

  let closest = 0;
  let closestSet: ITransaction[] = [];

  const SubSet = (
    index: number,
    currSum: number,
    currSet: ITransaction[]
  ): void => {
    if (currSum > totalAmount) return;

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
