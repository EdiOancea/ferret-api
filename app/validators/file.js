const error = require('../services/error');
const Validator = require('./crudValidator');

class FileValidator extends Validator {
  async validateCreate(file) {
    if (!file.path || file.id) {
      error.throwValidationError('Invalid file format.');
    }
  }

  async validateUpdate(id, data) {
    const { originalFileName, ...restData } = data;
    if (restData !== undefined) {
      error.throwValidationError('You can only change the original file name.');
    }

    const existingFile = await this.repository.get(id);
    if (!existingFile) {
      error.throwNotFoundError('File not found.');
    }
  }
};

module.exports = new FileValidator({
  repositoryName: 'file',
  modelName: 'File',
});
