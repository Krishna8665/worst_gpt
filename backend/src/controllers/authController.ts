import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import dotenv from "dotenv";
import envConfig from "../config/config";
import { initUserUsage } from "../utils/initUserUsage";
import { Types } from "mongoose";

dotenv.config();

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are required!" });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists!" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  //   await User.create({
  //     username: username,
  //     email: email,
  //     password: password,
  //   });

  //  Freemium credits initialized here
  await initUserUsage(user.id.toString());

  res.status(201).json({ message: "User registered successfully!" });
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare passwords
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    await initUserUsage(user.id);

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, _id: user._id.toString() },
      envConfig.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Send token in cookies instead of response headers
    res.cookie("token", token, {
      httpOnly: true, // Cookie is not accessible via JavaScript (security)
      secure: process.env.NODE_ENV === "development", // Use secure cookie if in production (HTTPS)
      maxAge: 3600000, // 1 hour expiration time
      sameSite: "strict", // Strict CSRF protection
    });

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again." });
  }
};

// LOGOUT
const logout = (req: Request, res: Response) => {
  // Clear the cookie (log the user out)
  res.clearCookie("token", { path: "/" }); // Clear the cookie with the name 'token'
  res.status(200).json({ message: "Logged out successfully!" });
};

export { registerUser, login, logout };
