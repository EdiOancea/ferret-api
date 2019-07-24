const crudRouter = require('./crudRouter');

module.exports = crudRouter('appointment', 'companies/:companyId/appointments');
