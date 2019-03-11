const httpStatus = require('http-status');

class APIError {

  constructor(
    message,
    data,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic,
    stack
  ) {
    this.name = this.constructor.name;
    this.message = message;
    this.data = data;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
  }
}

export default APIError;
