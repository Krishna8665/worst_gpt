import mongoose, { Schema, Document } from "mongoose";

interface IVerificationCode extends Document {
  email: string;
  code: string;
  createdAt: Date;
}

const VerificationCodeSchema = new Schema<IVerificationCode>({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVerificationCode>("VerificationCode", VerificationCodeSchema);
