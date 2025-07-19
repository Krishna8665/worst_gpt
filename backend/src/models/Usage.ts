import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUsage extends Document {
  userId: Types.ObjectId; 
  
  credits: number;
  resetDate: Date;
  isPremium: boolean;
}

const usageSchema = new Schema<IUsage>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  
  credits: {
    type: Number,
    required: true,
    default: 100, // adjust as needed
  },
  resetDate: {
    type: Date,
    required: true,
  },
  isPremium: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model<IUsage>('Usage', usageSchema);
