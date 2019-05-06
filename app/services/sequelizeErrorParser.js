module.exports = (errors) => {
  if (errors.name.slice(0, 9) !== 'Sequelize') {
    return null;
  }

  return errors.errors.reduce((previousError, currentError) => {
    previousError[currentError.path] = currentError.message;
    return previousError;
  }, {});
};
