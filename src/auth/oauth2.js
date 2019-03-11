/*************************************
 * oauth2 functions for various grant types
 * generates new token
 * *************************************/

import oauth2orize from 'oauth2orize';
import passport from 'passport';
import { checkPassword } from './password-auth';
import {
  generateToken,
  decodeToken
} from './jsonwebtoken';
import { CustomerRepository } from '../modules/db/repository/customerRepository';
import { getResponse, getErrorResponse } from '../modules/shared/config/response';
import { getTimestamp } from '../modules/shared';

import * as error from '../modules/shared/middlewares/error';
const httpStatus = require('http-status');
// create OAuth 2.0 server
const authServer = oauth2orize.createServer();

// destroy old tokens and generates a new access and refresh token
const generateTokens = (tokenObj, user, done) => {
  const token = generateToken(tokenObj);
  tokenObj.Token = token;
  return done(null, true, {
    Token: tokenObj.Token,
    userInfo: user
  });
};

authServer.exchange(
  oauth2orize.exchange.refreshToken(async function (
    client,
    refreshToken,
    scope,
    done
  ) {
    const refreshTokenData = decodeToken(refreshToken);
    const customerRepository = new CustomerRepository();
    const user_data = await customerRepository.getCustomerByUsername(
      refreshTokenData.username
    );
    user_data.LastAccess = getTimestamp();
    delete user_data.password;
    return generateTokens(user_data, user_data, done);
  })
);

// exchange username & password for access token.
authServer.exchange(
  oauth2orize.exchange.password(async function (
    client,
    username,
    password,
    scope,
    done
  ) {
    const customerRepository = new CustomerRepository();
    const user_data = await customerRepository.getCustomerByUsername(username);
    if (user_data != null) {
      if (checkPassword(password, user_data.password)) {
        const userObj = user_data;
        userObj.LastAccess = getTimestamp();
        delete userObj.password;

        return generateTokens(user_data, userObj, done);
      } else {
        return done(
          getErrorResponse(
            httpStatus.EXPECTATION_FAILED,
            "Invalid username/password"
          )
        );
      }
    } else {
      return done(
        getErrorResponse(httpStatus.NOT_FOUND, "Invalid username/password")
      );
    }
  })
);

exports.token = [
  passport.authenticate(['oauth2-client-password'], { session: false }),
  authServer.token(),
  error.handler
];
