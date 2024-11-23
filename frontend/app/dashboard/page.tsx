"use client";
import { useState } from "react";
import { CustomInput } from "../components/common/customInput";
import SortableTable from "../components/common/table";
import Navbar from "../components/navbar/navbar";
import CreateTxnModal from "../components/createTransaction/createTxn";
import CreateReportModal from "../components/report/createReportInput";
import { TransactionReport } from "../utils/type";
import ReportModal from "../components/report/reportModal";

export default function Dashboard() {
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [reprotdata, setReportData] = useState<TransactionReport>();

  const data = [
    {
      _id: "6740638143c78eb3565dde00",
      transactionId: "12345654321",
      userId: "674044a74e5fee2de22dc11d",
      userName: "user1",
      type: "TRANSFER",
      amount: 5000,
      description: "amount is being transferred to xyz from abc",
      datetime: "2024-11-22T10:57:05.635Z",
      __v: 0,
    },
    {
      _id: "6740638143c78eb3565dde01",
      transactionId: "12345654321",
      userId: "674044a74e5fee2de22dc11d",
      userName: "user2",
      type: "PAYMENT",
      amount: 1500,
      description: "payment received from abc",
      datetime: "2024-11-21T08:30:00.000Z",
      __v: 0,
    },
  ];

  const [searchTxn, setSearchTxn] = useState("");
  const [isTxnModalOpen, setTxnIsModalOpen] = useState(false);
  const [isReportCreateModalOpen, setIsReportCreateModalOpen] = useState(false);

  const handleGenerateReport = async (
    startDate: string,
    endDate: string,
    amount: number
  ) => {
    try {
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        amount: amount.toString(),
      }).toString();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/transaction/generatereport?${queryParams}`,
        {
          method: "GET",
        }
      );
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error generating report:", errorData);
        return;
      }

      const reportData = await response.json();
      setReportData(reportData);
      setIsReportCreateModalOpen(false);
      setReportModal(true);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex justify-between m-4">
        <div className="flex items-center justify-between border ">
          <CustomInput
            label={""}
            placeholder={"Serach"}
            onChange={(e) => {
              setSearchTxn(e.target.value);
            }}
            value={searchTxn}
          />
          <button
            onClick={() => {
              window.location.href = "/signin";
            }}
            className="px-4 py-2 text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-md m-1 "
          >
            Login
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setTxnIsModalOpen(true);
            }}
            className="px-4 py-2 text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-md m-1 "
          >
            Create Txn
          </button>
          <button
            onClick={() => {
              setIsReportCreateModalOpen(true);
            }}
            className="px-4 py-2 text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-md m-1 "
          >
            Genrate Report
          </button>
        </div>
      </div>
      <SortableTable data={data} />
      {isTxnModalOpen && (
        <CreateTxnModal onClose={() => setTxnIsModalOpen(false)} />
      )}
      {isReportCreateModalOpen && (
        <CreateReportModal
          onClose={() => setIsReportCreateModalOpen(false)}
          onGenerate={handleGenerateReport}
        />
      )}
      {reportModal && (
        <ReportModal
          TransactionReport={reprotdata}
          onClose={() => {
            setReportModal(false);
          }}
        />
      )}
    </div>
  );
}
