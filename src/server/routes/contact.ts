/* contact.ts ROUTER
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */
import express from 'express';
import { DisplayListPage, DisplayAddPage, DisplayEditPage, ProcessAddPage, ProcessEditPage, ProcessDeletePage } from '../controllers/contact';

const router = express.Router();

// Route the appropriate CONTACT pages here.
router.get('/list', DisplayListPage);
router.get('/add', DisplayAddPage);
router.get('/edit/:id', DisplayEditPage);
// Process the CONTACT pages through post.
router.post('/add', ProcessAddPage);
router.post('/edit/:id', ProcessEditPage);
// Remove contact with this route.
router.get('/delete/:id', ProcessDeletePage);

export default router;