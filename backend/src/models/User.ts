import mongoose, { Schema, model } from 'mongoose';

export interface IUser  {
  _id: string;
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  //   googleId: string;
  //   stripeCustomerId?: string;
  //   stripeSubscriptionId?: string;
  //   subscriptionStatus?: string;
  //   dailyCreditsUsed: number;
  //   lastReset: Date;
}

const UserSchema = new Schema<IUser>({
 _id:{type:String,required:true},
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: function (this: any) {
      return !this.googleId; // ✅ Skip password check if Google login
    },
  },
  googleId: { type: String, required: false }, // ✅ add this

  //   googleId: { type: String, required: true },
  //   stripeCustomerId: String,
  //   stripeSubscriptionId: String,
  //   subscriptionStatus: String,
  //   dailyCreditsUsed: { type: Number, default: 0 },
  //   lastReset: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>("User", UserSchema);
