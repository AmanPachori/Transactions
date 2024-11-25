"use client";
import React, { useState } from "react";
import { CustomInput } from "../common/CustomInput";

interface TransactionModalProps {
  onClose: () => void;
  onGenerate: (
    startDate: string,
    endDate: string,
    amount: number,
    userId?: string,
    userName?: string,
    transactionId?: string
  ) => void;
  typeofModal: string;
}

export default function CreateReportModal(
  TransactionModalProps: TransactionModalProps
) {
  const { onClose, onGenerate, typeofModal } = TransactionModalProps;
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [userName, setUserName] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");

  const handleGenerateClick = () => {
    if (!amount && !startDate && !endDate && !transactionId && !userName) {
      alert("Please fill amount atleast!");
      return;
    }
    onGenerate(
      startDate,
      endDate,
      Number(amount),
      typeofModal === "search" ? userName : undefined,
      typeofModal === "search" ? transactionId : undefined
    );
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="border bg-white p-10 md:w-[50vw] rounded-lg">
        <div className=" flex justify-between items-center mb-3">
          <div className="text-md md:text-3xl font-extrabold">
            {typeofModal != "search" ? "Generate Report" : "Search"}
          </div>
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
          {typeofModal === "search" && (
            <>
              <CustomInput
                label="User Name"
                placeholder="Enter User Name"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              <CustomInput
                label="Transaction ID"
                placeholder="Enter Transaction ID"
                type="text"
                onChange={(e) => setTransactionId(e.target.value)}
                value={transactionId}
              />
            </>
          )}
          <button
            type="button"
            className="mt-8 w-full text-white bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleGenerateClick}
          >
            {typeofModal != "search" ? "Generate Report" : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}
