const userRepository = require('../repositories/user');
const error = require('../services/error');
const sequelizeErrorParser = require('./sequelizeErrorParser');

class UserService {
  async get(id) {
    let foundUser = await userRepository.get(id);
    if (!foundUser) {
      error.throwNotFoundError('User not found.');
    }

    return foundUser;
  }

  async create(user) {
    if (user.id) {
      error.throwValidationError('Invalid user format.');
    }

    if (user.email) {
      const userExists = await userRepository.getByEmail(user.email);
      if (userExists) {
        error.throwValidationError('Email already used.');
      }
    }

    const createdUser = await userRepository.create(user);

    return await this.get(createdUser.id);
  }

  async delete(id) {
    await this.get(id);
    await userRepository.delete(id);
    const deletedUser =  await userRepository.getNonParanoid(id);

    return deletedUser;
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

module.exports = new UserService();
