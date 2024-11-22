"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cronController_1 = require("../controllers/cronController");
const router = (0, express_1.Router)();
router.post("/start", cronController_1.startCron);
router.post("/stop", cronController_1.stopCron);
exports.default = router;
