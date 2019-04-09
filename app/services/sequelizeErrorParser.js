module.exports = (errors) => {
  if (errors.name !== 'SequelizeValidationError') {
    return null;
  }

  return errors.errors.reduce((previousError, currentError) => {
    previousError[currentError.path] = currentError.message;
    return previousError;
  }, {});
};
