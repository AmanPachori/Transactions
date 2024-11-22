import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware: (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => void = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Missing or invalid token",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload & {
      id: string;
      email: string;
    };

    if (!decodedToken.id || !decodedToken.email) {
      throw new Error("Invalid token payload");
    }

    req.user = {
      id: decodedToken.id,
      email: decodedToken.email,
    };

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(403).json({
      message: "Access denied: invalid or expired token",
    });
  }
};
