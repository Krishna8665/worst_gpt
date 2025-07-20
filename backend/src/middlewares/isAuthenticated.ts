import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string, email: string };
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded._id); 

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = {
      _id: user._id.toString(),
      email: user.email
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
