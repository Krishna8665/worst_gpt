import express from 'express';
// import { handleGptQuery } from '../controllers/gptController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/gpt', isAuthenticated, handleGptQuery);

export default router;
