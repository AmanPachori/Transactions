"use client";
import { useEffect, useState } from "react";
import { CustomInput } from "../components/common/CustomInput";
import SortableTable from "../components/common/Table";
import Navbar from "../components/navbar/Navbar";
import CreateTxnModal from "../components/createTransaction/CreateTxn";
import CreateReportModal from "../components/report/CreateReportInput";
import { Transaction, TransactionReport } from "../utils/type";
import ReportModal from "../components/report/ReportModal";
import { GenerateReport, Search, startCron, stopCron } from "../utils/getData";

export default function Dashboard() {
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [reprotdata, setReportData] = useState<TransactionReport>();
  const [txnData, setTxnData] = useState<Transaction[]>();
  const [searchTxn, setSearchTxn] = useState("");
  const [isTxnModalOpen, setTxnIsModalOpen] = useState(false);
  const [isReportCreateModalOpen, setIsReportCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [iscron, setIscron] = useState<boolean>(false);

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
    setTxnData(data.transactions);

    setIsSearchModalOpen(false);
  }
  async function handleSearch(description: string) {
    const data = await Search("", "", "", description);
    setTxnData(data.transactions);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await Search("", "", "");
      setTxnData(data.transactions);
    }
    fetchData();
    let interval: NodeJS.Timeout;

    if (iscron) {
      interval = setInterval(async () => {
        const data = await Search("", "", "");
        setTxnData(data.transactions);
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [iscron]);

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
                handleSearch(searchTxn);
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
            {iscron ? (
              <button
                onClick={() => {
                  stopCron();
                  setIscron(false);
                }}
                className="px-4 py-2 text-white bg-red-700 focus:ring-4 focus:ring-gray-300 rounded-md m-1 "
              >
                Stop Cron
              </button>
            ) : (
              <button
                onClick={() => {
                  startCron();
                  setIscron(true);
                }}
                className="px-4 py-2 text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-md m-1 "
              >
                Start Cron
              </button>
            )}
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
        <div>
          {iscron ? (
            <p className="text-red-600 m-4">
              ***Cron job is running adding txn every second and ui updates
              every 1 minute***
            </p>
          ) : (
            <p>{iscron}</p>
          )}
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
