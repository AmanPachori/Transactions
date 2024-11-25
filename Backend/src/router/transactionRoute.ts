import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createTransaction,
  generateTransactions,
  getTransactionById,
  searchTransactions,
} from "../controllers/transactionController";
const router = Router();

// POST /create - Create a new transaction
// Request: { type, amount, description } (Auth required)
// Success: 201 (Created): { message, transaction }
// Errors: 401 (Unauthorized), 404 (User not found), 500 (Internal server error)
router.post("/create", authMiddleware, createTransaction);

// GET /get/:id - Fetch transaction by ID
// Request: ID in params (Auth required)
// Success: 200 (OK): { message, transaction }
// Errors: 401 (Unauthorized), 404 (Transaction not found), 500 (Internal server error)
router.get("/get/:id", authMiddleware, getTransactionById);

// GET /search - Search transactions
// Query: { userName, userId, transactionId, amount, startDate, endDate, description, page, limit }
// Success: 200 (OK): { message, data: { transactions, pagination } }
// Errors: 404 (No transactions found), 500 (Internal server error)
router.get("/search", searchTransactions);

// GET /generatereport - Generate transaction report
// Query: { startDate, endDate, amount }
// Success: 200 (OK): { message, report, transactions }
// Errors: 500 (Internal server error)
router.get("/generatereport", generateTransactions);

export default router;
