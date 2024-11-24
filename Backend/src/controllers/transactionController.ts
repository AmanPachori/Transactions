import { Request, Response } from "express";
import { Transaction } from "../models/transactionModel";
import { TransactionTypeEnum } from "../utils/enum";
import UserModel from "../models/userModel";
import { validateDate } from "../utils/common/dateUtlis";
import { handleError } from "../utils/common/errorsUtils";
import { parseAmount } from "../utils/common/amountUtils";
import { closeToSumTransaction } from "../utils/common/closestTothesum";

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type, amount, description } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return handleError(res, "Unauthorized User Please Signin Again", 401);
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return handleError(res, "User not found", 404);
    }

    const transactionId = `${Math.floor(Math.random() * 100000)}`;

    const transaction = new Transaction({
      transactionId,
      userId,
      userName: user?.name,
      type: type || TransactionTypeEnum.DEPOSIT,
      amount,
      description,
      datetime: new Date(),
    });

    const savedTransaction = await transaction.save();
    res.status(201).json({
      message: "Transaction created successfully",
      transaction: savedTransaction,
    });
  } catch (error) {
    handleError(res, "Error creating transaction");
  }
};

export const getTransactionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const transactionId = req.params.id;

  if (!userId) {
    return handleError(res, "Unauthorized User Please Signin Again", 401);
  }

  try {
    const transaction = await Transaction.findOne({ transactionId });
    if (!transaction) {
      return handleError(
        res,
        "Transaction not found or Unauthorized Access",
        404
      );
    }

    res.status(200).json({
      message: "Transaction fetched successfully",
      transaction,
    });
  } catch (error) {
    handleError(res, "Error fetching transaction by ID");
  }
};

export const searchTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { amount, startDate, endDate, description, page, limit } = req.query;
  let query: any = {};

  if (amount) query.amount = parseAmount(amount as string);
  if (startDate || endDate) {
    query.datetime = {};
    if (startDate) query.datetime.$gte = validateDate(startDate as string);
    if (endDate) query.datetime.$lte = validateDate(endDate as string);
  }
  if (description) query.description = { $regex: description, $options: "i" };

  let transactions;
  let totalTransactions;

  if (page && limit) {
    const pgNo = parseInt(page as string, 10) || 1;
    const pgSize = parseInt(limit as string, 10) || 10;
    const skip = (pgNo - 1) * pgSize;
    transactions = await Transaction.find(query).skip(skip).limit(pgSize);
    totalTransactions = await Transaction.countDocuments(query);
    if (totalTransactions) {
      return handleError(res, "No transactions found", 404);
    }
    res.status(200).json({
      message: "Transactions fetched successfully",
      data: {
        transactions,
        pagination: {
          totalTransactions,
          currentPage: pgNo,
          totalPages: Math.ceil(totalTransactions / pgSize),
          pgSize,
        },
      },
    });
  } else {
    try {
      transactions = await Transaction.find(query);

      if (transactions.length === 0) {
        return handleError(res, "No transactions found", 404);
      }

      res.status(200).json({
        message: "Transactions fetched successfully",
        transactions,
      });
    } catch (error) {
      handleError(res, "Error searching transactions");
    }
  }
};

export const generateTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { startDate, endDate, amount } = req.query;
  const stage: any = {};
  const maxAmount = amount ? parseAmount(amount as string) : null;

  try {
    if (startDate || endDate) {
      stage.datetime = {};
      if (startDate) stage.datetime.$gte = validateDate(startDate as string);
      if (endDate) stage.datetime.$lte = validateDate(endDate as string);
    }

    const pipeline = [
      { $match: stage },
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          totalTransactions: 1,
          totalAmount: 1,
        },
      },
    ];

    const reportSummary = await Transaction.aggregate(pipeline);
    const transactions = await Transaction.find(stage);

    if (maxAmount) {
      const result = closeToSumTransaction(transactions, maxAmount);
      res.status(200).json({
        message: "Transaction report generated successfully",
        report: {
          totalTransactions: result?.transactions.length,
          SumAmount: result?.total,
        },
        transactions: result?.transactions,
      });
    } else {
      res.status(200).json({
        message: "Transaction report generated successfully",
        report: reportSummary[0] || { totalTransactions: 0, totalAmount: 0 },
        transactions,
      });
    }
  } catch (error) {
    handleError(res, "Error generating transaction report");
  }
};
