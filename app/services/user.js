const userRepository = require('../repositories/user');
const error = require('../services/error');
const sequelizeErrorParser = require('./sequelizeErrorParser');

class UserService {
  async getUser(id) {
    let foundUser = await userRepository.getUser(id);
    if (!foundUser) {
      error.throwNotFoundError("User not found.");
    }

    return foundUser;
  }

  async createUser(user) {
    if (user.email) {
      const userExists = await userRepository.getUserByEmail(user.email);
      if (userExists) {
        error.throwValidationError("Email already used.");
      }
    }
    const createdUser = await userRepository.createUser(user);

    return await this.getUser(createdUser.id);
  }

  async deleteUser(id) {
    await this.getUser(id);
    await userRepository.deleteUser(id);
    const deletedUser =  await userRepository.getUserNonParanoid(id);

    return deletedUser;
  }

  async updateUser(id, newUserData) {
    if (newUserData.id !== undefined) {
      error.throwValidationError("You can not change the id.");
    }
    if (newUserData.email !== undefined) {
      error.throwValidationError("You can not change the email.");
    }
    if (newUserData.password !== undefined) {
      error.throwValidationError("You can not change the password.");
    }

    await this.getUser(id);
    await userRepository.updateUser(id, newUserData);

    return await this.getUser(id);
  }
};

module.exports = new UserService();
