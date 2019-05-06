const db = require('../models');

class UserRepository {
  getByEmail(email) {
    return db.user.findOne({
      where: { email },
      paranoid: false,
    });
  }

  get(id) {
    return db.user.findOne({ where: { id } });
  }

  getNonParanoid(id) {
    return db.user.findOne({
      where: { id },
      paranoid: false,
    });
  }

  create(newUser) {
    return db.user.create(newUser);
  }

  delete(id) {
    return db.user.destroy({ where: { id } });
  }

  update(id, newUserData) {
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
