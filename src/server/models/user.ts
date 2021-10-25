/* user.ts MODEL
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */

import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';

// create a user schema for use in MongoDB
const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    displayName: String
}, {
    collection: 'users'
});

// ALWAYS HASH PASSWORDS WHEN STORING THEM IN A DB
UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
});
// This attaches a method to the user schema, allowing us to check if the password matches the encrypted version
UserSchema.methods.isValidPassword = async function (password: string) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

// Global type we export so we can reference it with TypeScript
// This is just a type for users where we can store their _id and display name as well as username/password.
declare global {
    export type UserDocument = mongoose.Document & {
        _id: String,
        username: String,
        password: String,
        displayName: String
    }
}
// Now set the model up and export it
const Model = mongoose.model('User', UserSchema);
export default Model;