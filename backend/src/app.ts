import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport";
import session from "express-session";
import routes from "./routes/index";
import cors from "cors";
import "./cronJobs/resetUsage";
import { rateLimiter } from "./middlewares/rateLimiters";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Added CORS configuration
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter); // Applies to all incoming requests
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret", // Added fallback secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.use(globalErrorHandler);

export default app;
