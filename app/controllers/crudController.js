module.exports = class Controller {
  constructor(serviceName) {
    this.service = require(`../services/${serviceName}`);
  }

  async create(req, res, next) {
    res.json(await this.service.create(req.body, req.files));
  }

  async delete(req, res, next) {
    res.json(await this.service.delete(req.params.id));
  }

  async update(req, res, next) {
    res.json(await this.service.update(req.params.id, req.body));
  }

  async get(req, res, next) {
    res.json(await this.service.get(req.params.id));
  }

  async getAll(req, res, next) {
    res.json(await this.service.getAll());
  }
};
