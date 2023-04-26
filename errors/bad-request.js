const CustomAPIError = require("./custom-api.js");
const StatusCodes = require("http-status-codes");

module.exports = class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
};
