import express from "express";
import { login, logout, registerUser } from "../controllers/authController";
import asyncHandler from "../utils/asyncHandler";
import passport from "passport";

const router = express.Router();

// Register & Login
router.post("/register", asyncHandler(registerUser));
router.post("/login", login);
router.post("/logout", logout);

// Landing route (for testing)
router.get("/", (req, res) => {
  res.send("<a href='/api/auth/google'>Login with Google</a>");
});

// Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", {
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
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/api/auth/profile");
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
