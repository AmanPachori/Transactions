"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cronController_1 = require("../controllers/cronController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// POST /start - Start the cron job
// Request: No body (Auth required)
// Success: 200 (OK): { message: "cron job started successfully" }
// Errors: 500 (Failed to start cron job)
router.post("/start", authMiddleware_1.authMiddleware, cronController_1.startCron);
// POST /stop - Stop the cron job
// Request: No body (Auth required)
// Success: 200 (OK): { message: "cron job stopped successfully" }
// Errors: 500 (Failed to stop cron job)
router.post("/stop", authMiddleware_1.authMiddleware, cronController_1.stopCron);
exports.default = router;
