const companyController = require('../controllers/company');
const wrapError = require('../services/wrapError');
const crudRouter = require('./crudRouter');

const companyRouter = crudRouter('company', 'companies');

companyRouter.route('/companies/')
  .get(wrapError(companyController.getAll.bind(companyController)));

module.exports = companyRouter;
