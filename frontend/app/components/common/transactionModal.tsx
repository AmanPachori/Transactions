import React from "react";
import { Transaction } from "@/app/utils/type";
interface TransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export default function TransactionModal(
  TransactionModalProps: TransactionModalProps
) {
  const { transaction, onClose } = TransactionModalProps;

  if (!transaction) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold">Transaction Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <span className="font-semibold">Transaction ID:</span>{" "}
            {transaction.transactionId}
          </div>
          <div>
            <span className="font-semibold">User ID:</span> {transaction.userId}
          </div>
          <div>
            <span className="font-semibold">User Name:</span>{" "}
            {transaction.userName}
          </div>
          <div>
            <span className="font-semibold">Type:</span> {transaction.type}
          </div>
          <div>
            <span className="font-semibold">Amount:</span> ₹{transaction.amount}
          </div>
          <div>
            <span className="font-semibold">Description:</span>{" "}
            {transaction.description}
          </div>
          <div>
            <span className="font-semibold">Date & Time:</span>{" "}
            {new Date(transaction.datetime).toLocaleString()}
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
