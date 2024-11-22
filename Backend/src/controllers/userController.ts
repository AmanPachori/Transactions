import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "1h";

// User Signup Controller Function

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "This email is already registered." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User created successfully!",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error during signup process:", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred. Please try again." });
  }
};

// User Signin Controller Function

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Invalid credentials. Please check your email or password.",
      });
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        message: "Invalid credentials. Please check your email or password.",
      });
      return;
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET_KEY,
      {
        expiresIn: JWT_EXPIRY,
      }
    );

    res.status(200).json({
      message: "Login successfully completed",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during signin", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred. Please try again." });
  }
};
