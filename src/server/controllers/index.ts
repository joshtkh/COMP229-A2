/* index.ts CONTROLLER
Implements the functions needed in the index.ts ROUTER
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */

import express from 'express';
import { UserDisplayName } from '../tools/userDisplayName';

// Export all routes for INDEX PAGES
export function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('content/home', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
}
export function DisplayAboutPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('content/about', { title: 'About Me', page: 'about', displayName: UserDisplayName(req) });
}
export function DisplayProjectsPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('content/projects', { title: 'Projects', page: 'projects', displayName: UserDisplayName(req) });
}
export function DisplayServicesPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('content/services', { title: 'Services', page: 'services', displayName: UserDisplayName(req) });
}
export function DisplayContactPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('content/contact', { title: 'Contact', layout: 'layouts/contact-layout', page: 'contact', displayName: UserDisplayName(req) });
}