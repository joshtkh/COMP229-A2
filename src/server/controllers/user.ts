/* user.ts CONTROLLER
Implements the functions needed in the user.ts ROUTER
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */
import { NextFunction, Request, Response } from "express";
import passport from 'passport';
import { UserDisplayName } from "../tools/userDisplayName";

export async function DisplayLoginPage(req: Request, res: Response) {
    // If there is no user, send them to the login page.
    if (!req.user) {
        return res.render('content/auth/login', { title: 'Login', page: 'auth/login', displayName: UserDisplayName(req) })
    }
    // If there is a user logged in already, send them to the contact-list.
    return res.redirect('/contact/list');
}

// After login, redirect them to the contact-list page
export async function ProcessLoginPage(req: Request, res: Response, next: NextFunction) {
    console.log("HELLO WTF IS GOING ON");
    return res.redirect('/contact/list');
}

export async function DisplayRegisterPage(req: Request, res: Response, next: NextFunction) {
    // If the user isnt already logged in, we show them the register page
    if (!req.user) {
        return res.render('content/auth/register', { title: 'Register', page: 'auth/register', displayName: UserDisplayName(req) })
    }
    // if the user is already logged in, redirect them to the contact list instead
    return res.redirect('/contact/list');
}

export async function ProcessRegisterPage(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('signup', function (err, user, info) {
        console.log(err, user, info);
        if (err) {
            return next(err);
        }
        // If the user already exists, tell them.
        if (!user) {
            return res.render('content/auth/register', { title: 'Register', page: 'auth/register', displayName: UserDisplayName(req) })
        }
        // if the register was a success, redirect to the login page.
        return res.redirect('/auth/login');
    })(req, res, next);
}

// log the user out by destroying the session and redirect them back to the login page
export async function ProcessLogout(req: Request, res: Response) {
    req.session.destroy((err: any) => {
        if (err) {
            return err;
        }
        res.redirect('/auth/login');
    })
}