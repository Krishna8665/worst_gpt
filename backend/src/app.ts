import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cookieParser from 'cookie-parser';
import passport from "passport";
import './config/passport';
import session from 'express-session';
import routes from "../src/routes/index"

import router from "./routes/auth.routes";




const app = express();
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(globalErrorHandler);


export default app;
