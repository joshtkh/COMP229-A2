/* index.ts ROUTER
Supplies the GET requests for our INDEX PAGES
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */
import express from "express";
import { DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayProjectsPage, DisplayServicesPage } from "../controllers";

const router = express.Router();

// Print to the console to let dev know the app is running.
console.log("Application started.");

/* GET all needed INDEX pages */
router.get("/", DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/about', DisplayAboutPage);
router.get('/projects', DisplayProjectsPage);
router.get('/services', DisplayServicesPage);
router.get('/contact', DisplayContactPage);

export default router;