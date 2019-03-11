import APIError from '../APIError';
import { env } from '../config/vars';
import { getErrorResponse } from '../config/response';

const httpStatus = require('http-status');
const expressValidation = require('express-validation');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export function handler(err, req, res, next) {
  const response = getErrorResponse(err.status, err.data, err.data);

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
  res.end();
}

exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export function converter(err, req, res, next) {
  let convertedError = err;
  if (err instanceof expressValidation.ValidationError) {
    convertedError = {
      status: err.status,
      data: err.message
    };
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError(
      err.messageCode,
      null,
      err.status,
      false,
      err.stack
    );
  }

  return handler(convertedError, req, res);
}

/**
 * Catch 404 and forward to error handler
 * @public
 */
export function notFound(req, res, next) {
  const err = new APIError(
    'Not found',
    null,
    httpStatus.NOT_FOUND,
    false,
    null
  );
  return handler(err, req, res);
}
