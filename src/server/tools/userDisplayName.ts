/* userDisplayName.ts MODEL
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */
import { Request } from 'express';
// Function that allows us to easily create a display name for the user using their first+last name
export function UserDisplayName(req: Request) {
    if (req.user) {
        let user = req.user as UserDocument;
        return user.displayName.toString();
    }
    return "";
}