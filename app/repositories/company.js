const Repository = require('./crudRepository');

class CompanyRepository extends Repository {};

module.exports = new CompanyRepository('companies');
