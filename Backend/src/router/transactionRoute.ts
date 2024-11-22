import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createTransaction,
  generateTransactions,
  getTransactionById,
  searchTransactions,
} from "../controllers/transactionController";
const router = Router();

router.post("/create", authMiddleware, createTransaction);
router.get("/get/:id", authMiddleware, getTransactionById);
router.get("/search", searchTransactions);
router.get("/generatereport", generateTransactions);

export default router;
