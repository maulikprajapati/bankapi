/**************************************
 * Get response for api call
 * if options = { test:'123' } -> { status: 200, response: { success: true, test: '123' } }
 *
 * Examples...
 * getResponse() -> { status: 200, response: { success: true } }
 * getResponse(400, 'something wrong') -> { status: 400, response: { success: false, error: 'something wrong' } }
 * getResponse(200, null, { test: '123' }) -> { status: 200, response: { success: true, test: '123' } }
 ************************************/
const httpStatus = require('http-status');

export function getResponse(
  status = httpStatus.OK,
  data = null,
  messageCode = null,
  success = true
) {
  const result = {
    status: status,
    messageCode: messageCode ? messageCode.toString() : '200',
    data: data,
    success: success
  };
  if (status >= 400) {
    result.success = false;
  }
  return result;
}

export function getErrorResponse(status = httpStatus.INTERNAL_SERVER_ERROR, messageCode = null) {
  const result = {
    status: status,
    messageCode: messageCode ? messageCode.toString() : '500',
    success: false
  };

  return result;
}
