/* user.ts CONTROLLER
Implements the functions needed in the user.ts ROUTER
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */
import { NextFunction, Request, Response } from "express";
import passport from 'passport';
import { UserDisplayName } from "../tools/userDisplayName";

export function DisplayLoginPage(req: Request, res: Response) {
    if (!req.user) {
        return res.render('content/auth/login', { title: 'Login', page: 'auth/login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) })
    }
    return res.redirect('content/contact/contact-list');
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction) {
    return res.redirect('content/contact/contact-list')
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction) {
    // If the user isnt already logged in, we show them the register page
    if (!req.user) {
        return res.render('content/auth/register', { title: 'Register', page: 'auth/register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req) })
    }
    // if the user is already logged in, redirect them to the contact list.
    return res.redirect('content/contact/contact-list');
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('signup', function (err, user, info) {
        console.log(err, user, info);
        if (err) {
            return next(err);
        }
        // If the user already exists, tell them.
        if (!user) {
            return res.render('content/auth/register', { title: 'Register', page: 'auth/register', messages: req.flash('registerMessage', 'User Already Exists'), displayName: UserDisplayName(req) })
        }
        // if the register was a success, redirect to the login page.
        return res.redirect('content/auth/login');
    })(req, res, next);
}

export function ProcessLogout(req: Request, res: Response) {
    req.session.destroy((err: any) => {
        if (err) {
            return err;
        }
        res.redirect('content/auth/login');
    })
}