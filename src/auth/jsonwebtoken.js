/**************************************
 * operations related to json web token
 ***************************************/

import jwt from 'jsonwebtoken';
import {
  jwtSecret,
  jwtExpiration
} from '../modules/shared/config/vars.js';
import { getTimestamp } from '../modules/shared';

// generate new token with required data
export function generateToken(userData) {
  const tokenObj = {
    id: userData.id,
    username: userData.username,
    account_id: userData.account_id,
    role: userData.role
  };
  return jwt.sign(tokenObj, jwtSecret, { expiresIn: jwtExpiration });
}

// verify whether provided token is formatted correct jwt
export function verifyToken(token) {
  try {
    const ret = {
      isError: false,
      payload: jwt.verify(token, jwtSecret)
    };
    return ret;
  } catch (error) {
    return {
      isError: true,
      errMsg: error.message
    };
  }
}

// export function generateRefreshToken(email) {
//   return jwt.sign({ user_email: email, timeStamp: getTimestamp() }, jwtSecret);
// }

// decode encrypted token for verification
export function decodeToken(token) {
  return jwt.decode(token);
}
