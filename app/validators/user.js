const error = require('../services/error');
const Validator = require('./crudValidator');

class UserValidator extends Validator {
  async validateCreate(user) {
    if (user.id) {
      error.throwValidationError('Invalid user format.');
    }

    if (user.email) {
      const existingUser = await this.repository.getByPropsNonParanoid({
        email: user.email,
      });
      if (existingUser) {
        error.throwValidationError('Email already used.');
      }
    }
  }

  async validateUpdate(id, data) {
    if (data.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    if (data.email !== undefined) {
      error.throwValidationError('You can not change the email.');
    }

    if (data.password !== undefined) {
      error.throwValidationError('You can not change the password.');
    }

    const existingUser = await this.repository.get(id);
    if (!existingUser) {
      error.throwNotFoundError('User not found.');
    }
  }
};

module.exports = new UserValidator({
  repositoryName: 'user',
  modelName: 'User',
});
