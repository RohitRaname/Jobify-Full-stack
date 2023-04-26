
const CustomAPIError= require('./custom-api.js')
const StatusCodes= require('http-status-codes')

module.exports =  class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
