const userService = require('../services/user');
const errorService = require('../services/error');

class UserController {
  async createUser(req, res, next) {
    res.json(await userService.createUser(req.body));
  }

  async deleteUser(req, res, next) {
    res.json(await userService.deleteUser(req.params.id));
  }

  async updateUser(req, res, next) {
    res.json(await userService.updateUser(req.params.id, req.body));
  }

  async getUser(req, res, next) {
    res.json(await userService.getUser(req.params.id));
  }
}

module.exports = new UserController();
