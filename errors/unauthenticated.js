
const CustomAPIError= require('./custom-api.js')
const StatusCodes= require('http-status-codes')
module.exports = class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
