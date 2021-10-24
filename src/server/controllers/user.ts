import { NextFunction, Request, Response } from "express";
import passport from 'passport';
import { UserDisplayName } from "../tools/userDisplayName";

export async function DisplayLoginPage(req: Request, res: Response) {
    if (!req.user) {
        return res.render('index', { title: 'Login', page: 'auth/login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) })
    }
    return res.redirect('/contact/list');
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction) {
    return res.redirect('/contact/list')
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.render('index', { title: 'Register', page: 'auth/register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req) })
    }

    return res.redirect('/contact/list');
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('signup', function (err, user, info) {
        console.log(err, user, info);
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.render('index', { title: 'Register', page: 'auth/register', messages: req.flash('registerMessage', 'User Already Exists'), displayName: UserDisplayName(req) })
        }

        return res.redirect('/auth/login');
    })(req, res, next);
}

export function ProcessLogout(req: Request, res: Response) {
    req.session.destroy((err: any) => {
        if (err) {
            return err;
        }
        res.redirect('/auth/login');
    })
}