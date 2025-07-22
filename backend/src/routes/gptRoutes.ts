import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { handleGptQuery } from "../controllers/gptController";
import { rateLimiter } from "../middlewares/rateLimiters";

const router = express.Router();

router.post("/gpt", isAuthenticated, rateLimiter, handleGptQuery);

export default router;
