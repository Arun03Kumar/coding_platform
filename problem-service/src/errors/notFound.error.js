const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

class NotFoundError extends BaseError {
  constructor(resourceName, resourceVal) {
    super(
      "NotFoundError",
      StatusCodes.NOT_FOUND,
      `The resourcec with ${resourceName} name with value ${resourceVal} not found`,
      { resourceName, resourceVal }
    );
  }
}

module.exports = NotFoundError;
