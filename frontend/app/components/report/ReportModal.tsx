"use client";
import { TransactionReport } from "@/app/utils/type";
import React from "react";
import { SortableTable } from "../common/Table";
import { downloadReport } from "@/app/utils/reportDownload";
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
          <div className="font-semibold text-lg">Summary - </div>
          <div className="">
            <p className="m-2">
              Total Transactions: {TransactionReport?.report.totalTransactions}
            </p>
            <p className="m-2">
              Total Amount: ₹{TransactionReport?.report.SumAmount}
              <br />
              <span className="text-red-600">
                **return amount closet to your input if amount provided **
              </span>
            </p>
          </div>
          <SortableTable data={TransactionReport?.transactions} />
        </div>
        <button
          type="button"
          className="mt-4 mx-2 text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => {
            downloadReport(TransactionReport?.transactions);
          }}
        >
          Download Report
        </button>
      </div>
    </div>
  );
}
