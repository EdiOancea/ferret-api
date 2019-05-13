const Repository = require('./crudRepository');

class UserRepository extends Repository {};

module.exports = new UserRepository('user');
