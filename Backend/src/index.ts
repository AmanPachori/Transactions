import express from "express";
import cors from "cors";
import mongooseConnect from "./config/dbConfig";
import userRouter from "./router/userRoute";
import transactionRouter from "./router/transactionRoute";
import cronRouter from "./router/cronRoute";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/cron", cronRouter);
mongooseConnect();
