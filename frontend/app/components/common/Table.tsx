"use client";
import React, { useState } from "react";
import TransactionModal from "./TransactionModal";
import Pagination from "./Pagination";
import { Transaction } from "@/app/utils/type";

interface SortableTableProps {
  data: Transaction[] | undefined;
}

export function SortableTable({ data }: SortableTableProps) {
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

  const field = (item: Transaction, field: string): unknown => {
    switch (field) {
      case "amount":
        return item.amount;
      case "datetime":
        return new Date(item.datetime).getTime();
      case "type":
        return item.type.toLowerCase();
      default:
        return "";
    }
  };

  const sortedData = Array.isArray(data)
    ? data.sort((x, y) => {
        const a = field(x, sortField) as string | number;
        const b = field(y, sortField) as string | number;

        if (a < b) return sortOrder === "asc" ? -1 : 1;
        if (a > b) return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : [];

  const itemsPerPage = 10;
  const totalPages = sortedData
    ? Math.ceil(sortedData?.length / itemsPerPage)
    : 0;

  const PaginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto mx-4 rounded-xl border border-gray-600">
      <table className="min-w-full bg-white text-left">
        <thead className="bg-gray-100 text-sm sm:text-md">
          <tr>
            <th className="py-3 px-2 ">Txn Id</th>
            <th className="py-3 px-2 hidden lg:block">User Name</th>
            <th
              className="py-3 px-2 cursor-pointer"
              onClick={() => sortData("type")}
            >
              Type {sortField === "type" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="py-3 px-2 cursor-pointer"
              onClick={() => sortData("amount")}
            >
              Amount{" "}
              {sortField === "amount" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="py-3 px-2 cursor-pointer"
              onClick={() => sortData("datetime")}
            >
              Date Time{" "}
              {sortField === "datetime" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className="py-3 px-2 hidden lg:block">Description</th>
          </tr>
        </thead>
        <tbody>
          {PaginatedData &&
            PaginatedData.map((transaction) => (
              <tr
                onClick={() => setSelectedTransaction(transaction)}
                key={transaction._id}
                className="border-t text-sm md:text-md hover:bg-gray-50"
              >
                <td className="py-3 px-2 ">{transaction.transactionId}</td>
                <td className="hidden lg:block py-3 px-2">
                  {transaction.userName}
                </td>
                <td className="py-3 px-2">{transaction.type}</td>
                <td className="py-3 px-2">{transaction.amount}</td>
                <td className="py-3 px-2">
                  {new Date(transaction.datetime).toLocaleString()}
                </td>
                <td className="py-3 px-2 hidden lg:block">
                  {transaction.description}
                </td>
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
