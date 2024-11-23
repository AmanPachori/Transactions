"use client";
import { TransactionReport } from "@/app/utils/type";
import React from "react";
import SortableTable from "../common/Table";
interface ReportModalProps {
  TransactionReport: TransactionReport | undefined;
  onClose: () => void;
}

export default function ReportModal(ReportModalProps: ReportModalProps) {
  const { TransactionReport, onClose } = ReportModalProps;

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="border bg-white p-10 w-[90vw] rounded-lg">
        <div className=" flex justify-between items-center mb-3">
          <div className="text-3xl font-extrabold"> Report</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>
        <div className="mb-6">
          <div className="font-semibold">Summary</div>
          <div className="mt-2">
            <p>
              Total Transactions: {TransactionReport?.report.totalTransactions}
            </p>
            <p>Total Amount: ₹{TransactionReport?.report.SumAmount}</p>
          </div>
          <SortableTable data={TransactionReport?.transactions} />
        </div>
      </div>
    </div>
  );
}
