import { Router } from "express";

import { startCron, stopCron } from "../controllers/cronController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

// POST /start - Start the cron job
// Request: No body (Auth required)
// Success: 200 (OK): { message: "cron job started successfully" }
// Errors: 500 (Failed to start cron job)
router.post("/start", authMiddleware, startCron);

// POST /stop - Stop the cron job
// Request: No body (Auth required)
// Success: 200 (OK): { message: "cron job stopped successfully" }
// Errors: 500 (Failed to stop cron job)
router.post("/stop", authMiddleware, stopCron);

export default router;
