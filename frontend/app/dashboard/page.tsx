"use client";
import { useEffect, useState } from "react";
import { CustomInput } from "../components/common/CustomInput";
import SortableTable from "../components/common/Table";
import Navbar from "../components/navbar/Navbar";
import CreateTxnModal from "../components/createTransaction/CreateTxn";
import CreateReportModal from "../components/report/CreateReportInput";
import { Transaction, TransactionReport } from "../utils/type";
import ReportModal from "../components/report/ReportModal";
import { GenerateReport, Search } from "../utils/getData";

export default function Dashboard() {
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [reprotdata, setReportData] = useState<TransactionReport>();
  const [txnData, setTxnData] = useState<Transaction[]>();

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
    {
      _id: "6740638dde00",
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
      _id: "674063814301",
      transactionId: "12345654321",
      userId: "674044a74e5fee2de22dc11d",
      userName: "user2",
      type: "PAYMENT",
      amount: 1500,
      description: "payment received from abc",
      datetime: "2024-11-21T08:30:00.000Z",
      __v: 0,
    },
    {
      _id: "6740b3565dde00",
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
      _id: "638143c78eb3565dde01",
      transactionId: "12345654321",
      userId: "674044a74e5fee2de22dc11d",
      userName: "user2",
      type: "PAYMENT",
      amount: 1500,
      description: "payment received from abc",
      datetime: "2024-11-21T08:30:00.000Z",
      __v: 0,
    },
    {
      _id: "6738143c78eb3565dde00",
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
      _id: "67408143c78eb3565dde01",
      transactionId: "12345654321",
      userId: "674044a74e5fee2de22dc11d",
      userName: "user2",
      type: "PAYMENT",
      amount: 1500,
      description: "payment received from abc",
      datetime: "2024-11-21T08:30:00.000Z",
      __v: 0,
    },
    {
      _id: "674068143c78eb3565dde00",
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
      _id: "67406381565dde01",
      transactionId: "12345654321",
      userId: "674044a74e5fee2de22dc11d",
      userName: "user2",
      type: "PAYMENT",
      amount: 1500,
      description: "payment received from abc",
      datetime: "2024-11-21T08:30:00.000Z",
      __v: 0,
    },
    {
      _id: "6740638143c73565dde00",
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
      _id: "6740638143c78565dd01",
      transactionId: "12345654321",
      userId: "674044a74e5fee2de22dc11d",
      userName: "user2",
      type: "PAYMENT",
      amount: 1500,
      description: "payment received from abc",
      datetime: "2024-11-21T08:30:00.000Z",
      __v: 0,
    },
    {
      _id: "67406381c78eb3565dde00",
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
      _id: "6740638143c78565dde01",
      transactionId: "12345654321",
      userId: "674044a74e5fee2de22dc11d",
      userName: "user2",
      type: "PAYMENT",
      amount: 1500,
      description: "payment received from abc",
      datetime: "2024-11-21T08:30:00.000Z",
      __v: 0,
    },
    {
      _id: "6740638143eb3565dde00",
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
      _id: "6740638143c78eb3dde01",
      transactionId: "12345654321",
      userId: "674044a74e5fee2de22dc11d",
      userName: "user2",
      type: "PAYMENT",
      amount: 1500,
      description: "payment received from abc",
      datetime: "2024-11-21T08:30:00.000Z",
      __v: 0,
    },
    {
      _id: "6740638143c78eb3565e00",
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
      _id: "6740638143c78eb3565dde1",
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
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  async function handleGenerateReport(
    startDate: string,
    endDate: string,
    amount: number
  ) {
    const reportData = await GenerateReport(startDate, endDate, amount);
    setReportData(reportData);
    setIsReportCreateModalOpen(false);
    setReportModal(true);
  }
  async function handleSearchModal(
    startDate: string,
    endDate: string,
    amount: number
  ) {
    const data = await Search(startDate, endDate, amount);
    console.log(data);
    setTxnData(data.transactions);

    setIsSearchModalOpen(false);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await Search("", "", "");
      setTxnData(data.transactions);
    }
    fetchData();
  }, []);

  if (txnData) {
    return (
      <div className="">
        <Navbar />
        <div className="flex justify-between m-4">
          <div className="flex items-center justify-between border ">
            <CustomInput
              label={""}
              placeholder={"Serach based partial desc search"}
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
              Search
            </button>
            <button
              onClick={() => {
                setIsSearchModalOpen(true);
              }}
              className="px-4 py-2 text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-md m-1 "
            >
              Filtered Search
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
        <SortableTable data={txnData} />
        {isTxnModalOpen && (
          <CreateTxnModal onClose={() => setTxnIsModalOpen(false)} />
        )}
        {isReportCreateModalOpen && (
          <CreateReportModal
            onClose={() => setIsReportCreateModalOpen(false)}
            onGenerate={handleGenerateReport}
            typeofModal={""}
          />
        )}
        {isSearchModalOpen && (
          <CreateReportModal
            onClose={() => setIsSearchModalOpen(false)}
            onGenerate={handleSearchModal}
            typeofModal={"search"}
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
  } else {
    return <p>Loading...</p>;
  }
}
