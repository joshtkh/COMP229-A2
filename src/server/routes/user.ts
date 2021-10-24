import { Router } from "express";
import { DisplayLoginPage, DisplayRegisterPage, ProcessLoginPage, ProcessLogout, ProcessRegisterPage } from "../controllers/user";
import passport from '../middleware/auth';

const router = Router();

// Route the appropriate USER pages here.
router.get('/login', DisplayLoginPage);
// Authenticate the login with passport, then process the page
router.post('/login', passport.authenticate('login', {
    successRedirect: '/contact/list',
    failureRedirect: '/auth/login',
    failureFlash: true
}), ProcessLoginPage);
router.get('/register', DisplayRegisterPage);
router.post('/register', ProcessRegisterPage);
router.get('/logout', ProcessLogout);

export default router;