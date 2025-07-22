// src/controllers/gptController.ts
import { Request, Response } from "express";
import Usage from "../models/Usage";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DeepseekResponse } from "../types/deepseek";
import axios from "axios";

dotenv.config();

export const handleGptQuery = async (req: Request, res: Response) => {
  try {

    console.log('🔥 GPT route hit');
    console.log('User:', req.user);
    console.log('Body:', req.body);

    // Strong type checking
    if (!req.user || !("_id" in req.user)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Handle both string and ObjectId types
    const userId =
      typeof req.user._id === "string"
        ? new mongoose.Types.ObjectId(req.user._id)
        : req.user._id;

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Rest of  controller logic...
    const tokensUsed = Math.ceil(prompt.length / 4);
    const usage = await Usage.findOne({ userId });

    if (!usage) {
      return res.status(403).json({ message: "No usage record found." });
    }

    if (!usage.isPremium && usage.credits < tokensUsed) {
      return res.status(403).json({ message: "Not enough credits!" });
    }

     console.log('📡 Making Deepseek request...');



const deepseekResponse = await axios.post(
  'https://api.deepseek.com/beta/chat/completions',
  {
  model: 'deepseek-chat', // or deepseek-coder / deepseek-reasoner
  messages: [{ role: 'user', content: prompt }],
  max_tokens: 1024
},
  {
    headers: {
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      
    }
  }
);

    console.log("🔑 API Key:", process.env.DEEPSEEK_API_KEY);
type DeepseekChatResponse = {
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

console.log('🧪 Deepseek Raw Response:', JSON.stringify(deepseekResponse.data, null, 2));

const responseData = deepseekResponse.data as DeepseekChatResponse;

const usedTokens = responseData.usage?.total_tokens || 0;
const completion = responseData.choices?.[0]?.message?.content || '';

    // Deduct tokens if not premium
    if (!usage.isPremium) {
      usage.credits -= usedTokens;
      await usage.save();
    }

    // const sarcasticReply = `WorstGPT: "${prompt}"? Wow, that's... impressively incorrect. You're on fire. 🔥`;
    res.status(200).json({
      // response: sarcasticReply,
      response: completion,
      tokensUsed: tokensUsed,
      remainingCredits: usage.isPremium ? "∞" : usage.credits,
    });
  } catch (error: any) {
    console.error('GPT handler error:', error?.response?.data || error.message || error);
    res.status(500).json({ message: 'Server error.' });
  }
};
