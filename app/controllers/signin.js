const signinService = require('../services/signin');

class SigninController {
  async authenticate(req, res, next) {
    res.json({ token: await signinService.authenticate(req.body) });
  }
};

module.exports = new SigninController();
