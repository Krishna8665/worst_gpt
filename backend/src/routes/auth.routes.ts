import { Request, Response } from "express";
import Usage from "../models/Usage";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import express from "express";
import {
  login,
  logout,
  registerUser,
  sendVerificationCode,
  verifyAndRegister,
} from "../controllers/authController";
import asyncHandler from "../utils/asyncHandler";
import passport from "passport";

const router = express.Router();

// Register & Login
router.post("/register", asyncHandler(registerUser));
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-code", sendVerificationCode);
router.post("/verify-and-register", verifyAndRegister);

// Landing route (for testing)
router.get("/", (req, res) => {
  res.send("<a href='/api/auth/google'>Login with Google</a>");
});

// Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    //g
    scope: ["profile", "email"],
  })
);

// Protected route
router.get("/profile", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/api/auth/");
  }
  const user = req.user as any;
  res.send(`Welcome Respected ${user.username}`);
});

//Handle callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const user = req.user as any;
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Redirect to frontend with token in query
    res.redirect(`${process.env.CLIENT_URL}/google-redirect?token=${token}`);
  }
);



// Logout route (GET or POST)
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    // Destroy session completely
    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid"); // Only if you're using express-session
      res.redirect("/api/auth"); // or wherever you want to redirect after logout
    });
  });
});

export default router;
