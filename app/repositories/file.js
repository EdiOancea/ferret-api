const Repository = require('./crudRepository');

class FileRepository extends Repository {};

module.exports = new FileRepository('files');
