const addressService = require('../services/address');
const errorService = require('../services/error');

class AddressController {
  async create(req, res, next) {
    res.json(await addressService.create(req.body));
  }

  async delete(req, res, next) {
    res.json(await addressService.delete(req.params.id));
  }

  async update(req, res, next) {
    res.json(await addressService.update(req.params.id, req.body));
  }

  async get(req, res, next) {
    res.json(await addressService.get(req.params.id));
  }
};

module.exports = new AddressController();
