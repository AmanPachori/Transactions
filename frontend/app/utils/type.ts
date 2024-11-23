export interface Transaction {
  _id: string;
  transactionId: string;
  userId: string;
  userName: string;
  type: string;
  amount: number;
  description: string;
  datetime: string;
  __v: number;
}

export interface TransactionReport {
  message: string;
  report: {
    totalTransactions: number;
    SumAmount: number;
  };
  transactions: Transaction[];
}
