"use client";
import React, { useState } from "react";
import { CustomInput } from "../common/CustomInput";
import { createTransaction } from "@/app/utils/getData";
import { transactionTypes } from "@/app/utils/constants";
interface TransactionModalProps {
  onClose: () => void;
}
export default function CreateTxnModal(
  TransactionModalProps: TransactionModalProps
) {
  const { onClose } = TransactionModalProps;
  const [type, setType] = useState<string>("DEPOSIT");
  const [amount, setAmount] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const token = localStorage.getItem("Token");

  const handleCreateTransaction = async () => {
    const payload = {
      type,
      amount: Number(amount),
      description,
    };

    const isCreated = await createTransaction(payload, token);
    console.log(isCreated);
    if (isCreated) {
      window.location.reload();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="border bg-white p-10 md:w-[50vw] rounded-lg">
        <div className=" flex justify-between items-center mb-3">
          <div className="text-md md:text-3xl font-extrabold">Create Txn</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>
        <div className="pt-2">
          <label className="block text-sm font-semibold">
            Transaction Type
          </label>
          <select
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 mb-4"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {transactionTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace("_", " ")}
              </option>
            ))}
          </select>
          <CustomInput
            label="Amount"
            placeholder="Enter amount"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount.toString()}
          />
          <label className="block mt-4 text-sm font-semibold">
            Description
          </label>
          <textarea
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 mb-2"
          ></textarea>

          <button
            type="button"
            className="mt-8 w-full text-white bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleCreateTransaction}
          >
            Create Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
