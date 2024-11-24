import { Transaction } from "./type";

export function downloadReport(
  transactions: Transaction[] | undefined,
  fileName = "Report.csv"
) {
  if (!transactions || transactions.length === 0) {
    console.error("No Transaction found to export.");
    return;
  }

  const headers = Object.keys(transactions[0]) as (keyof Transaction)[];
  const rows = transactions.map((transaction) =>
    headers.map((header) => JSON.stringify(transaction[header] ?? "")).join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const blobText = new Blob([csv], { type: "text/csv" });
  const URL = window.URL.createObjectURL(blobText);
  const link = document.createElement("a");
  link.href = URL;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(URL);
}
