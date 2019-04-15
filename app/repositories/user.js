const db = require('../models');

class UserRepository {
  getUserByEmail(email) {
    return db.user.findOne({
      where: { email },
      paranoid: false,
    });
  }

  getUser(id) {
    return db.user.findOne({ where: { id } });
  }

  getUserNonParanoid(id) {
    return db.user.findOne({
      where: { id },
      paranoid: false,
    });
  }

  createUser(newUser) {
    return db.user.create(newUser);
  }

  deleteUser(id) {
    return db.user.destroy({ where: { id } });
  }

  reactivateUser(id) {
    return db.user.restore({ where: { id } });
  }

  updateUser(id, newUserData) {
    return db.user.update(newUserData, {
      where: {
        id,
        deletedAt: null,
      },
      individualHooks: true,
    });
  }
};

module.exports = new UserRepository();
