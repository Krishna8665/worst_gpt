import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import dotenv from "dotenv";
import envConfig from "../config/config";
import { initUserUsage } from "../utils/initUserUsage";
import { Types } from "mongoose";
// controllers/auth/sendCode.ts
import VerificationCode from "../models/VerificationCode";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";
import Usage from "../models/Usage";

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

    res.status(200).json({
      message: "Login successful!",
      token,
    });
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

const sendVerificationCode = async (req: Request, res: Response) => {
  let { email } = req.body;

  if (!email.endsWith("@gmail.com")) {
    return res
      .status(400)
      .json({ message: "Only Gmail addresses are allowed." });
  }

  email = email.trim().toLowerCase();

  const code = randomInt(100000, 999999).toString();

  await VerificationCode.findOneAndUpdate(
    { email },
    { code, createdAt: new Date() },
    { upsert: true, new: true, runValidators: true }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use Gmail App Password
    },
  });

  await transporter.sendMail({
    from: `"WorstGPT" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your WorstGPT Verification Code",
    html: `<h2>Your code is: <b>${code}</b></h2>`,
  });

  return res.status(200).json({ message: "Code sent" });
};

// controllers/auth/verifyAndRegister.ts

const verifyAndRegister = async (req: Request, res: Response) => {
  const { email, username, password, code } = req.body;

  const record = await VerificationCode.findOne({ email });

  if (!record || record.code !== code) {
    return res
      .status(400)
      .json({ message: "Invalid or expired verification code." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const resetDate = new Date();
  resetDate.setDate(resetDate.getDate() + 30);

  await Usage.create({
    userId: newUser._id,
    credits: 100,
    resetDate,
    isPremium: false,
  });

  await VerificationCode.deleteOne({ email }); //code will be vanish from db after signup

  return res.status(201).json({ message: "Signup successful" });
};

export { registerUser, login, logout, sendVerificationCode, verifyAndRegister };
