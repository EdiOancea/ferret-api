const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signinRepository = require('../repositories/signin');
const errorService = require('../services/error');
const privateKey = process.env.JWT_SECRET;

class SigninService {
  async authenticate({ email, password }) {
    const user = await signinRepository.getUserPassword(email);
    if (!user) {
      errorService.throwValidationError('Invalid credentials.');
    }

    const res = bcrypt.compareSync(password, user.password);
    if (!res) {
      errorService.throwValidationError('Invalid credentials.');
    }

    return jwt.sign({ id: user.id }, privateKey, { expiresIn: 3600 });
  }
};

module.exports = new SigninService();
