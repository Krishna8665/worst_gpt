import { Types } from 'mongoose';
import { IUser } from '../../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId;
        email: string;
      };
    }
  }
}

export {};
