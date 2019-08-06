class ErrorService {
  throwValidationError(message = 'Validation error.') {
    const err = new Error(message);
    err.status = 422;

    throw err;
  }

  throwNotFoundError(message = 'Not found.') {
    const err = new Error(message);
    err.status = 404;

    throw err;
  }

  throwAccessNotGrantedError(message = 'You are not allowed to do that.') {
    const err = new Error(message);
    err.status = 403;

    throw err;
  }
};

module.exports = new ErrorService();
