import { Request, Response } from 'express';
import Usage from '../models/Usage';

export const handleGptQuery = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user._id;
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // Simulate token usage (e.g. 1 token = ~4 characters)
    const tokensUsed = Math.ceil(prompt.length / 4);

    const usage = await Usage.findOne({ userId });

    if (!usage) {
      return res.status(403).json({ message: 'No usage record found.' });
    }

    if (!usage.isPremium && usage.credits < tokensUsed) {
      return res.status(403).json({ message: 'Not enough credits!' });
    }

    // Deduct tokens if not premium
    if (!usage.isPremium) {
      usage.credits -= tokensUsed;
      await usage.save();
    }

    // Generate your sarcastic LLM response here (mocked)
    const sarcasticReply = `WorstGPT: "${prompt}"? Wow, that's... impressively incorrect. You're on fire. 🔥`;

    res.status(200).json({ response: sarcasticReply });
  } catch (error) {
    console.error('GPT handler error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
