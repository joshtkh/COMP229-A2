/* app.ts
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 03/10/2021 */
import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";
import mongoose from 'mongoose';
import * as DBConfig from './db';
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import flash from "express-flash";
import { isLoggedIn } from "../middleware/auth";

// MongoStore options
const StoreOptions = {
  store: MongoStore.create({
  mongoUrl: (DBConfig.RemoteURI) ? DBConfig.RemoteURI : DBConfig.LocalURI}),
  secret: DBConfig.Secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 600000
  }
}

// router imports
import indexRouter from "../routes/index";
import contactRouter from "../routes/contact";
import userRouter from "../routes/user";

// DB Configuration
mongoose.connect((DBConfig.RemoteURI) ? DBConfig.RemoteURI : DBConfig.LocalURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('connected to MongoDB at:' + DBConfig.HostName);
})

// App configuration
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// 
// I am using express-ejs-layouts to create page layouts
app.use(expressLayouts);
app.set('layout', 'layouts/layout'); // point to our default layout file
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Setup Flash here
app.use(flash());
// express session
app.use(session(StoreOptions));
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// ROUTER MIDDLEWARE
app.use("/", indexRouter);
app.use("/auth", userRouter);
// Before we let the user access the contact page, we make sure they are logged in first.
app.use("/contact", isLoggedIn, contactRouter);

// In case of file download, the user will go here
app.get('/download', function(req, res, next){
  const file = `${__dirname}/public/images/resume.pdf`;
  res.download(file); // Set disposition and send it.
});

// Catch any other route here and give a 404 error
app.get('*', function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:express.Request, res:express.Response, next:express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error', message: err.message });
});

//module.exports = app;
export default app;
