import mongoose, { Schema, Document, model } from "mongoose";
import { TransactionTypeEnum } from "../utils/enum";

interface ITransaction extends Document {
  transactionId: string;
  userId: mongoose.Types.ObjectId;
  userName: string;
  type: TransactionTypeEnum;
  amount: number;
  description: string;
  datetime: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  transactionId: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: Schema.Types.String, required: true },
  type: {
    type: String,
    enum: Object.values(TransactionTypeEnum),
    required: true,
  },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  datetime: { type: Date, required: true, default: Date.now },
});

TransactionSchema.index({ userId: 1 });
TransactionSchema.index({ type: 1, datetime: -1 });
TransactionSchema.index({ amount: 1 });

const Transaction = model<ITransaction>("Transaction", TransactionSchema);

export { Transaction, TransactionTypeEnum, ITransaction };
