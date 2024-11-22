"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const transactionController_1 = require("../controllers/transactionController");
const router = (0, express_1.Router)();
router.post("/create", authMiddleware_1.authMiddleware, transactionController_1.createTransaction);
router.get("/get/:id", authMiddleware_1.authMiddleware, transactionController_1.getTransactionById);
router.get("/search", transactionController_1.searchTransactions);
router.get("/generatereport", transactionController_1.generateTransactions);
exports.default = router;
