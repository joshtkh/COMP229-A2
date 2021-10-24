import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create a schema for Contacts in MongoDB
const ContactSchema = new Schema({
    contactName: String,
    contactNumber: String,
    emailAddress: String
}, {
    collection: "contacts"
});

// Now set it up and export
const Model = mongoose.model("Contact", ContactSchema);
export default Model;