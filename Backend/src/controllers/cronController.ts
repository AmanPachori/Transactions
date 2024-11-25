import { Request, Response } from "express";
import { startCronJob, stopCronJob } from "../utils/cornJob";

// start corn function
export const startCron = (req: Request, res: Response): void => {
  try {
    startCronJob();
    res.status(200).json({ message: "cron job started successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to start cron job" });
  }
};

//stop cron function
export const stopCron = (req: Request, res: Response): void => {
  try {
    stopCronJob();
    res.status(200).json({ message: "cron job stoped successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to stop cron job" });
  }
};
