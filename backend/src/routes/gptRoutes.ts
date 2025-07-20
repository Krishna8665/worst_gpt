import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { handleGptQuery } from '../controllers/gptController';

const router = express.Router();

router.post('/gpt', isAuthenticated,handleGptQuery );

export default router;
