// backend/config/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';
import { initUserUsage } from '../utils/initUserUsage';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/api/auth/google/callback',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: IUser | false) => void
    ) => {
      try {
        // Find existing user by Google ID
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Create new user with googleId (password not required here)
        const newUser = await User.create({
          username: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          googleId: profile.id,
          // password is NOT required for Google OAuth users
        });
        await initUserUsage(newUser.id); // ✅ create Usage record
        

        return done(null, newUser);
      } catch (error) {
        console.error('Google Strategy Error:', error);
        return done(error);
      }
    }
  )
);

// Serialize user ID into session
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// Deserialize user from ID stored in session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(new Error('User not found'));
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
