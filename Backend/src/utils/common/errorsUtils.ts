import { Response } from "express";

export const handleError = (
  res: Response,
  message: string,
  status: number = 500
): void => {
  console.error(message); // Log the error for debugging
  res.status(status).json({ message }); // Respond with a JSON error message
};
