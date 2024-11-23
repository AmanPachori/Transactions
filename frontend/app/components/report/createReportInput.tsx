"use client";
import React, { useState } from "react";
import { CustomInput } from "../common/customInput";

interface TransactionModalProps {
  onClose: () => void;
  onGenerate: (startDate: string, endDate: string, amount: number) => void;
}

export default function CreateReportModal(
  TransactionModalProps: TransactionModalProps
) {
  const { onClose, onGenerate } = TransactionModalProps;
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");

  const handleGenerateClick = () => {
    if (!amount) {
      alert("Please fill amount atleast!");
      return;
    }
    onGenerate(startDate, endDate, Number(amount));
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="border bg-white p-10 md:w-[50vw] rounded-lg">
        <div className=" flex justify-between items-center mb-3">
          <div className="text-3xl font-extrabold">Generate Report</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>
        <div className="pt-2">
          <CustomInput
            label="Start Date"
            placeholder="YYYY-MM-DD"
            type="date"
            onChange={(e) => setStartDate(e.target.value.toString())}
            value={startDate}
          />
          <CustomInput
            label="End Date"
            placeholder="YYYY-MM-DD"
            type="date"
            onChange={(e) => setEndDate(e.target.value.toString())}
            value={endDate}
          />
          <CustomInput
            label="Amount"
            placeholder="Enter amount"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount.toString()}
          />
          <button
            type="button"
            className="mt-8 w-full text-white bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleGenerateClick}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
