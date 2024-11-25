"use client";
import { useEffect, useState } from "react";
import { SortableTable } from "../components/common/Table";
import Navbar from "../components/navbar/Navbar";
import CreateTxnModal from "../components/createTransaction/CreateTxn";
import CreateReportModal from "../components/report/CreateReportInput";
import { Transaction, TransactionReport } from "../utils/type";
import ReportModal from "../components/report/ReportModal";
import DashboardNav from "../components/common/DashboardNav";
import {
  handleGenerateReport,
  handleSearch,
  handleSearchModal,
} from "../utils/constants";
import { Search, startCron, stopCron } from "../utils/getData";

export default function Dashboard() {
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [reprotdata, setReportData] = useState<TransactionReport>();
  const [txnData, setTxnData] = useState<Transaction[]>();
  const [searchTxn, setSearchTxn] = useState("");
  const [isTxnModalOpen, setTxnIsModalOpen] = useState(false);
  const [isReportCreateModalOpen, setIsReportCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [iscron, setIscron] = useState<boolean>(false);

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
        <DashboardNav
          searchTxn={searchTxn}
          setSearchTxn={setSearchTxn}
          handleSearch={(description) => handleSearch(description, setTxnData)}
          setIsSearchModalOpen={setIsSearchModalOpen}
          iscron={iscron}
          setIscron={setIscron}
          setTxnIsModalOpen={setTxnIsModalOpen}
          setIsReportCreateModalOpen={setIsReportCreateModalOpen}
          stopCron={stopCron}
          startCron={startCron}
        />
        {iscron && (
          <p className="text-red-600 m-4">
            ***Cron job is running adding txn every second and UI updates every
            1 minute***
          </p>
        )}
        <SortableTable data={txnData} itemsPerPage={10} />
        {isTxnModalOpen && (
          <CreateTxnModal onClose={() => setTxnIsModalOpen(false)} />
        )}
        {isReportCreateModalOpen && (
          <CreateReportModal
            onClose={() => setIsReportCreateModalOpen(false)}
            onGenerate={(startDate, endDate, amount) =>
              handleGenerateReport(
                startDate,
                endDate,
                amount,
                setReportData,
                setIsReportCreateModalOpen,
                setReportModal
              )
            }
            typeofModal={""}
          />
        )}
        {isSearchModalOpen && (
          <CreateReportModal
            onClose={() => setIsSearchModalOpen(false)}
            onGenerate={(startDate, endDate, amount, userName, transactionId) =>
              handleSearchModal(
                startDate,
                endDate,
                amount,
                userName,
                transactionId,
                setTxnData,
                setIsSearchModalOpen
              )
            }
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
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div
          className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
