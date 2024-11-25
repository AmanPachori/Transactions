import cron from "node-cron";
import { TransactionTypeEnum } from "./enum";
import { Transaction } from "../models/transactionModel";

let cronJob: any = null;

const createTransaction = async () => {
  const transaction = new Transaction({
    transactionId: Math.floor(Math.random() * 100000),
    userId: "63f9efb3c657d425287838c0",
    userName: "Cron Job user",
    type: TransactionTypeEnum.DEPOSIT,
    amount: Math.floor(Math.random() * 1000),
    description: "deposit transaction genrated from the cron job",
    datetime: new Date(),
  });
  await transaction.save();
};

const startCronJob = () => {
  if (!cronJob) {
    cronJob = cron.schedule("* * * * * *", createTransaction);
  } else {
    console.log("cron job already running");
  }
};

const stopCronJob = () => {
  if (cronJob) {
    cronJob.stop();
    cronJob = null;
  } else {
    console.log("no cron job is running");
  }
};

export { startCronJob, stopCronJob };
