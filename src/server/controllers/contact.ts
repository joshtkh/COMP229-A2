import express from 'express';
import ContactModel from '../models/contact';
import { UserDisplayName } from '../tools/userDisplayName';

//(R)ead in CRUD
export function DisplayListPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    ContactModel.find(function (err, contactCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log("COLLECTION: " + contactCollection);
        res.render('index', { title: 'Contact list', page: 'contact/contact-list', contact: contactCollection, displayName: UserDisplayName(req) })
    })
}

// Display (E)dit page
export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    ContactModel.findById(id, {}, {}, (err, contactItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        console.log("CONTACT ITEM TO EDIT: " + contactItemToEdit);
        res.render('index', { title: "Contact Edit", page: "contact/contact-edit", item: contactItemToEdit, displayName: UserDisplayName(req) })
    })
}

// Display (C)reate page
export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    // show the edit view
    res.render('index', { title: 'Add Contact', page: 'contact/contact-edit', item: '', displayName: UserDisplayName(req) });
}

// Process (E)dit page
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

// Process (C)reate page
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

// Process (D)elete page
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