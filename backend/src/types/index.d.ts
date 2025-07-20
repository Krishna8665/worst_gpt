// src/types/express.d.ts
import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface User {
      _id: Types.ObjectId | string;
      email: string;
      // Add other user properties as needed
    }

    interface Request {
      user?: User;
    }
  }
}

export {}; // Important: This makes the file a module