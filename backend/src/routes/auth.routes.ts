import express from 'express';
import { login, logout, registerUser } from '../controllers/authController';
import asyncHandler from '../utils/asyncHandler';
import passport from 'passport';


const router = express.Router();

// Register & Login
router.post('/register', asyncHandler(registerUser));
router.post('/login', login);
router.post('/logout', logout);

// Landing route (for testing)
router.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

// Google OAuth Routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

// Protected route
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/');
  }
  const user = req.user as any;
  res.send(`Welcome Respected ${user.username}`);
});

//Logout route (can be POST or GET)
router.get('/logout', (req, res, next) => {
  req.logout(() => {
    
    res.redirect('/auth/'); 
  });
});



export default router;
