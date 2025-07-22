// src/models/User.ts
import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password?: string;
  googleId?: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: function (this: IUser) {
      return !this.googleId;
    },
  },
  googleId: { type: String, required: false },
});

export default mongoose.model<IUser>("User", UserSchema);

// export interface IUser  {
//   _id: string;
//   username: string;
//   email: string;
//   password?: string;
//   googleId?: string;

// }

// const UserSchema = new Schema<IUser>({
//  _id:{type:String,required:true},
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: {
//     type: String,
//     required: function (this: any) {
//       return !this.googleId; // ✅ Skip password check if Google login
//     },
//   },
//   googleId: { type: String, required: false }, // ✅ add this

// });

// export default mongoose.model<IUser>("User", UserSchema);
