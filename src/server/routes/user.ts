import { Router } from "express";
import { DisplayLoginPage, DisplayRegisterPage, ProcessLoginPage, ProcessLogout, ProcessRegisterPage } from "../controllers/user";
import passport from '../middleware/auth';

const router = Router();

// Route the appropriate USER pages here.
router.get('/login', DisplayLoginPage);
router.post('/login', passport.authenticate('login'), ProcessLoginPage);
router.get('/register', DisplayRegisterPage);
router.post('/register', ProcessRegisterPage);
router.get('/logout', ProcessLogout);

export default router;