class ErrorService {
  throwValidationError(message = "Validation error.") {
    let err = new Error(message);
    err.status = 422;

    throw err;
  }

  throwNotFoundError(message = "Not found.") {
    let err = new Error(message);
    err.status = 404;

    throw err;
  }

  throwAccessNotGrantedError(message = "You are not allowed to do that.") {
    let err = new Error(message);
    err.status = 403;

    throw err;
  }
}

module.exports = new ErrorService();
