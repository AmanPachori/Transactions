import { Transaction, TransactionReport } from "@/app/utils/type";

import { GenerateReport, Search } from "./getData";

export const getTxnDetails = (transaction: Transaction) => [
  { label: "Transaction ID", value: transaction.transactionId },
  { label: "User ID", value: transaction.userId },
  { label: "User Name", value: transaction.userName },
  { label: "Type", value: transaction.type },
  { label: "Amount", value: `₹${transaction.amount}` },
  { label: "Description", value: transaction.description },
  {
    label: "Date & Time",
    value: new Date(transaction.datetime).toLocaleString(),
  },
];

export const transactionTypes = [
  "DEPOSIT",
  "TRANSFER",
  "EXTERNAL_PAYMENT",
  "WITHDRAWAL",
  "REFUND",
  "OTHER",
];
export async function handleGenerateReport(
  startDate: string,
  endDate: string,
  amount: number,
  setReportData: React.Dispatch<
    React.SetStateAction<TransactionReport | undefined>
  >,
  setIsReportCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setReportModal: React.Dispatch<React.SetStateAction<boolean>>
) {
  const reportData = await GenerateReport(startDate, endDate, amount);
  if (reportData) {
    setReportData(reportData);
  } else {
    alert("No report data");
  }
  setIsReportCreateModalOpen(false);
  setReportModal(true);
}

export async function handleSearchModal(
  startDate: string,
  endDate: string,
  amount: number,
  userName: string | undefined,
  transactionId: string | undefined,
  setTxnData: React.Dispatch<React.SetStateAction<Transaction[] | undefined>>,
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  const data = await Search(
    startDate,
    endDate,
    amount,
    userName,
    transactionId
  );
  if (data && data.transactions) {
    setTxnData(data.transactions);
  } else {
    setTxnData([]);
  }
  setIsSearchModalOpen(false);
}

export async function handleSearch(
  description: string,
  setTxnData: React.Dispatch<React.SetStateAction<Transaction[] | undefined>>
) {
  const data = await Search("", "", "", "", "", description);
  if (data && data.transactions) {
    setTxnData(data.transactions);
  } else {
    setTxnData([]);
  }
}
