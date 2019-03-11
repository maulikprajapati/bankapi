/*************************************
 * passport strategies implementation for
 * restricted routes
 * *************************************/

import passport from 'passport';
import { verifyToken } from './jsonwebtoken';
import { CustomerRepository } from '../modules/db/repository/customerRepository';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { getResponse, getErrorResponse } from '../modules/shared/config/response';
import {
  getTimestamp,
  getDateDifference
} from '../modules/shared';
import { jwtExpiration } from '../modules/shared/config/vars';
const httpStatus = require('http-status');
const jwtExpirationMinutes = jwtExpiration / (1000 * 60);

// ClientPassword strategy of passport js
// it will check client pass by user while login
passport.use(
  new ClientPasswordStrategy(async function (clientId, clientSecret, done) {
    return done(null, true);
  })
);

// Bearer Strategy of passport js
// it will check token for every request from client
passport.use(
  new BearerStrategy(async (accessToken, done) => {
    const tokenObj = verifyToken(accessToken);
    const customerRepository = new CustomerRepository();
    let userData = await customerRepository.getCustomerByUsername(tokenObj.payload.username);
    //const userData = await cache.getAsync(accessToken);

    if (tokenObj.isError) {
      if (tokenObj.errMsg.indexOf('expire') !== -1) {
        done("Token expired");
      }
      done("Invalid token");
    } else {
      userData.LastAccess = getTimestamp();

      done(null, userData);
    }
  })
);

export const validateToken = (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, user) => {
    if (user) {
      req['user_data'] = user;
      next();
    } else {
      next(getResponse(httpStatus.UNAUTHORIZED, null, err));
    }
  })(req, res, next);
};
