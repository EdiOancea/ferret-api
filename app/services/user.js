const CrudService = require('./crudService');
const userRepository = require('../repositories/user');
const error = require('./error');

class UserService extends CrudService {
  async create(user) {
    if (user.id) {
      error.throwValidationError('Invalid user format.');
    }

    if (user.email) {
      const userExists = await userRepository.getByPropsNonParanoid({ email: user.email });
      if (userExists) {
        error.throwValidationError('Email already used.');
      }
    }

    const createdUser = await userRepository.create(user);

    return await this.get(createdUser.id);
  }

  async update(id, newData) {
    if (newData.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    if (newData.email !== undefined) {
      error.throwValidationError('You can not change the email.');
    }

    if (newData.password !== undefined) {
      error.throwValidationError('You can not change the password.');
    }

    await this.get(id);
    await userRepository.update(id, newData);

    return await this.get(id);
  }
};

module.exports = new UserService({
  repositoryName: 'user',
  modelName: 'User',
});
