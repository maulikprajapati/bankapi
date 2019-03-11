/**********************************
 * methods for password encryption
 * ******************************* */

import crypto from 'crypto';
import { salt } from '../modules/shared/config/vars';

// normal text to encrypted string
export function encryptPassword(password) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
}

// verify normal string is valid compare to encrypted string
export function checkPassword(password, hashedPassword) {
    return password == hashedPassword;
    //return encryptPassword(salt, password) === hashedPassword;
}

export function generateSaltString() {
    return crypto.randomBytes(32).toString('hex'); /** convert to hexadecimal format */
    // .slice(0, 16);   /** return required number of characters */
}
