import { Types } from 'mongoose';
import Usage from '../models/Usage';

export const initUserUsage = async (userId: Types.ObjectId) => {
  const existing = await Usage.findOne({ userId });
  if (existing) return;

  const resetDate = new Date();
  resetDate.setDate(resetDate.getDate() + 30);

  await Usage.create({
    userId,
    credits: 100,
    resetDate,
    isPremium: false,
  });
};
