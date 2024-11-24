import cron from "node-cron";
import { TransactionTypeEnum } from "./enum";
import { Transaction } from "../models/transactionModel";

let cronJob: any = null;

const createTransaction = async () => {
  const transaction = new Transaction({
    transactionId: Math.floor(Math.random() * 100000),
    userId: "63f9efb3c657d425287838c0",
    userName: "User1",
    type: TransactionTypeEnum.DEPOSIT,
    amount: Math.floor(Math.random() * 1000),
    description: "Deposit transaction genrated from cron job",
    datetime: new Date(),
  });
  await transaction.save();
  console.log("Transaction saved:", transaction);
};

const startCronJob = () => {
  if (!cronJob) {
    cronJob = cron.schedule("* * * * * *", createTransaction);
  } else {
    console.log("Cron job already running");
  }
};

const stopCronJob = () => {
  if (cronJob) {
    cronJob.stop();
    cronJob = null;
  } else {
    console.log("No cron job is running");
  }
};

export { startCronJob, stopCronJob };
