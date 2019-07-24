const CrudController = require('./crudController');

class AppointmentController extends CrudController {
  async create(req, res, next) {
    res.json(await this.service.create(req.body, req.params.companyId));
  }
}

module.exports = new AppointmentController('appointment');
