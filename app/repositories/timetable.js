const Repository = require('./crudRepository');

class TimetableRepository extends Repository {};

module.exports = new TimetableRepository('timetables');
