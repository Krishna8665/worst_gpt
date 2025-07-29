import express from "express";
import gptRoutes from "./gptRoutes";
import authRoutes from "./auth.routes";
import userRoutes from "./userRoutes";
const router = express.Router();

router.use("/gpt", gptRoutes);
router.use("/auth", authRoutes);
router.use("/user",userRoutes)
export default router;
