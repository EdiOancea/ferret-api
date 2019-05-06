const userService = require('../services/user');
const errorService = require('../services/error');

class UserController {
  async create(req, res, next) {
    res.json(await userService.create(req.body));
  }

  async delete(req, res, next) {
    res.json(await userService.delete(req.params.id));
  }

  async update(req, res, next) {
    res.json(await userService.update(req.params.id, req.body));
  }

  async get(req, res, next) {
    res.json(await userService.get(req.params.id));
  }
};

module.exports = new UserController();
