import { DashboardNavProps } from "@/app/utils/type";
import { CustomInput } from "./CustomInput";

export default function DashboardNav({
  searchTxn,
  setSearchTxn,
  handleSearch,
  setIsSearchModalOpen,
  iscron,
  setIscron,
  setTxnIsModalOpen,
  setIsReportCreateModalOpen,
  stopCron,
  startCron,
}: DashboardNavProps) {
  return (
    <div className="flex flex-wrap items-center justify-start m-4">
      <CustomInput
        label={""}
        placeholder={"Serach based partial desc "}
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
  );
}
