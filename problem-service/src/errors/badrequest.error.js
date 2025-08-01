const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

class BadRequest extends BaseError {
  constructor(propertyName) {
    super(
      "BadRequest",
      StatusCodes.BAD_REQUEST,
      `Invalid structure for ${propertyName} provided`,
      this.details
    );
  }
}

module.exports = BadRequest;
