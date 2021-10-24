/* contact.ts CONTROLLER
Implements the functions needed in the contact.ts ROUTER
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */

import express from 'express';
import ContactModel from '../models/contact';
import { UserDisplayName } from '../tools/userDisplayName';

//Read in CRUD
export function DisplayListPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    ContactModel.find(function (err, contactCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log("COLLECTION: " + contactCollection);
        res.render('content/contact/contact-list', { title: 'Contact list', page: 'contact/list', contact: contactCollection, displayName: UserDisplayName(req) })
    })
}

// Display Edit page
export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    ContactModel.findById(id, {}, {}, (err, contactItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        console.log("CONTACT ITEM TO EDIT: " + contactItemToEdit);
        res.render('content/contact/contact-edit', { title: "Contact Edit", page: "contact/edit", item: contactItemToEdit, displayName: UserDisplayName(req) })
    })
}

// Display Add page
export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    // show the edit view
    res.render('content/contact/contact-edit', { title: 'Add Contact', page: 'contact/edit', item: '', displayName: UserDisplayName(req) });
}

// Process Edit page
export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;

    let updatedItem = new ContactModel({
        "_id": id,
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "emailAddress": req.body.emailAddress
    });

    ContactModel.updateOne({ _id: id }, updatedItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/contact/list');
    })
}

// Process Add page
export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void {

    let newItem = new ContactModel({
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "emailAddress": req.body.emailAddress
    });

    ContactModel.create(newItem, (err: any) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/contact/list');
    })
}

// Process Delete page
export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    ContactModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact/list');
    })
}