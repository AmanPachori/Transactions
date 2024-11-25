"use client";
import React, { useState } from "react";
import TransactionModal from "./TransactionModal";
import Pagination from "./Pagination";
import { Transaction } from "@/app/utils/type";
import { sortDataUtils } from "@/app/utils/sortUtils";

interface SortableTableProps {
  data: Transaction[] | undefined;
  itemsPerPage: number;
}

export function SortableTable({ data, itemsPerPage }: SortableTableProps) {
  const [sortField, setSortField] = useState<string>("amount");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const sortData = (field: string) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };
  const sortedData = sortDataUtils(data, sortField, sortOrder);

  const totalPages = sortedData
    ? Math.ceil(sortedData?.length / itemsPerPage)
    : 0;

  const PaginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const headers = [
    { label: "Txn Id", field: null, hidden: false },
    { label: "User Name", field: null, hidden: "hidden lg:block" },
    { label: "Type", field: "type", hidden: false },
    { label: "Amount", field: "amount", hidden: false },
    { label: "Date Time", field: "datetime", hidden: false },
    { label: "Description", field: null, hidden: "hidden lg:block" },
  ];

  return (
    <div className="overflow-x-auto mx-4 rounded-xl border border-gray-600">
      <table className="min-w-full bg-white text-left">
        <thead className="bg-gray-100 text-sm sm:text-md">
          <tr>
            {headers.map(({ label, field, hidden }) => (
              <th
                key={label}
                className={`py-3 px-2 ${hidden || ""} ${
                  field ? "cursor-pointer" : ""
                }`}
                onClick={field ? () => sortData(field) : undefined}
              >
                {label}
                {field &&
                  sortField === field &&
                  (sortOrder === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PaginatedData &&
            PaginatedData.map((transaction) => (
              <tr
                key={transaction._id}
                onClick={() => setSelectedTransaction(transaction)}
                className="border-t text-sm md:text-md hover:bg-gray-50"
              >
                {[
                  transaction.transactionId,
                  transaction.userName,
                  transaction.type,
                  transaction.amount,
                  new Date(transaction.datetime).toLocaleString(),
                  transaction.description,
                ].map((value, index) => (
                  <td
                    key={index}
                    className={`py-3 px-2 ${
                      index === 1 || index === 5 ? "hidden lg:block" : ""
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {sortedData && sortedData.length > 10 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        <></>
      )}

      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}
