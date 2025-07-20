// src/controllers/gptController.ts
import { Request, Response } from 'express';
import Usage from '../models/Usage';
import mongoose from 'mongoose';

export const handleGptQuery = async (req: Request, res: Response) => {
  try {
    // Strong type checking
    if (!req.user || !('_id' in req.user)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Handle both string and ObjectId types
    const userId = typeof req.user._id === 'string' 
      ? new mongoose.Types.ObjectId(req.user._id)
      : req.user._id;

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // Rest of  controller logic...
    const tokensUsed = Math.ceil(prompt.length / 4);
    const usage = await Usage.findOne({ userId });

    if (!usage) {
      return res.status(403).json({ message: 'No usage record found.' });
    }

    if (!usage.isPremium && usage.credits < tokensUsed) {
      return res.status(403).json({ message: 'Not enough credits!' });
    }

    if (!usage.isPremium) {
      usage.credits -= tokensUsed;
      await usage.save();
    }

    const sarcasticReply = `WorstGPT: "${prompt}"? Wow, that's... impressively incorrect. You're on fire. 🔥`;
    res.status(200).json({ response: sarcasticReply });
  } catch (error) {
    console.error('GPT handler error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};