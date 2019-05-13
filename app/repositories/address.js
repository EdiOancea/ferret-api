const Repository = require('./crudRepository');

class AddressRepository extends Repository {};

module.exports = new AddressRepository('addresses');
