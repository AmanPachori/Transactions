"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopCron = exports.startCron = void 0;
const cornJob_1 = require("../utils/cornJob");
// start corn function
const startCron = (req, res) => {
    try {
        (0, cornJob_1.startCronJob)();
        res.status(200).json({ message: "cron job started successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to start cron job" });
    }
};
exports.startCron = startCron;
//stop cron function
const stopCron = (req, res) => {
    try {
        (0, cornJob_1.stopCronJob)();
        res.status(200).json({ message: "cron job stoped successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to stop cron job" });
    }
};
exports.stopCron = stopCron;
