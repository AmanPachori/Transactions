import { Router } from "express";

import { startCron, stopCron } from "../controllers/cronController";
const router = Router();

router.post("/start", startCron);
router.post("/stop", stopCron);

export default router;
