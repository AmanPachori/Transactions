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

export interface DashboardNavProps {
  searchTxn: string;
  setSearchTxn: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (description: string) => void;
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  iscron: boolean;
  setIscron: React.Dispatch<React.SetStateAction<boolean>>;
  setTxnIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReportCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stopCron: () => void;
  startCron: () => void;
}
