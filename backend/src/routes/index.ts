import express from "express";
import gptRoutes from "./gptRoutes";
import authRoutes from "./auth.routes";
const router = express.Router();

router.use("/gpt", gptRoutes);
router.use("/auth", authRoutes);
export default router;
