import React from "react";
import { Transaction } from "@/app/utils/type";
import { getTxnDetails } from "@/app/utils/constants";
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

  const details = getTxnDetails(transaction);

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
          {details.map(({ label, value }) => (
            <div key={label}>
              <span className="font-semibold">{label} - </span>
              {value}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full  text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 py-2 px-4 rounded-md "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
