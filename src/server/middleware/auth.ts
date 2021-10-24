/* auth.ts
- Handles passport authentication.

Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */

import passport from "passport";
import passportLocal, { IVerifyOptions } from 'passport-local';
import UserModel from '../models/user';
import { Request, Response, NextFunction } from 'express';

// we are storing locally, so we use a local strategy
const LocalStrategy = passportLocal.Strategy;
const strategyOptions: any = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
};

// Async login function because the models need to await when searching.
const loginFunction: any = async (
    req: Request,
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void) => {

    const user: any = await UserModel.findOne({ username });
    // if the user doesn't exist, send an error
    if (!user) {
        return done(null, false, { message: "User does not exist." });
    }
    // if the password isn't valid, send an error
    if (!(await user.isValidPassword(password))) {
        return done(null, false, { message: "Password is not valid." });
    }
    // If we get here, the user is authenticated properly and we can return the user through done.
    console.log("User Authenticated Successfully");
    return done(null, user);
}

// Async signup function needed, as models require await
const signupFunction = async (
    req: Request,
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
    try {
        //deconstructing
        const { username, password, FirstName, LastName, email } = req.body;
        console.log(req.body);

        if (!username || !password || !email || !FirstName || !LastName) {
            console.log("Invalid body fields");
            return done(null, false);
        }

        const query = {
            $or: [{ username: username }, { email: email }]
        };

        console.log(query);

        const user = await UserModel.findOne(query);

        if (user) {
            console.log('User already exists');
            console.log(user);
            return done(null, false);
        } else {
            const userData = {
                username,
                password,
                email,
                displayName: FirstName + " " + LastName
            }

            const newUser = new UserModel(userData);
            await newUser.save();

            return done(null, newUser)
        }
    } catch (err) {
        done(err);
    }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunction));
passport.use('signup', new LocalStrategy(strategyOptions, signupFunction));

// If the user isn't logged in and tries to access a secure page, they get redirected to the login page.
export const isLoggedIn = (req: Request, res: Response, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    done(null, req.user);
}

// small type def for TS
interface User {
    _id?: String;
}
// make sure to serialize/deserialize users with passport
passport.serializeUser((user: User, done) => {
    done(null, user._id)
});
passport.deserializeUser((userId, done) => {
    UserModel.findById(userId, function (err: any, user: any) {
        done(err, user);
    });
})

export default passport;