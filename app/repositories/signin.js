const db = require('../models');

class SigninRepository {
  async getUserPassword(email) {
    return await db.user.scope('auth').findOne({ where: { email } });
  }
};

module.exports = new SigninRepository();
