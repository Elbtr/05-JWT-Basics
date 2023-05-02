const CustomAPIError = require("./custom-error");

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statuscode = 400;
  }
}

module.exports = BadRequest;
