import { Request, Response } from "express";
import { startCronJob, stopCronJob } from "../utils/cornJob";

export const startCron = (req: Request, res: Response): void => {
  try {
    startCronJob();
    res.status(200).json({ message: "Cron job started successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to start cron job" });
  }
};
export const stopCron = (req: Request, res: Response): void => {
  try {
    stopCronJob();
    res.status(200).json({ message: "Cron job stoped successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to stop cron job" });
  }
};
