const Repository = require('./crudRepository');

class FieldOfActivityRepository extends Repository {};

module.exports = new FieldOfActivityRepository('fields_of_activity');
