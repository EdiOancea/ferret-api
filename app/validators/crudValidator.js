const error = require('../services/error');

module.exports = class CrudValidator {
  constructor(props) {
    this.modelName = props.modelName;
    this.repository = require(`../repositories/${props.repositoryName}`);
  }

  async validateUpdate(id, data) {
    if (data.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    const existingRecord = await this.repository.get(id);
    if (!existingRecord) {
      error.throwNotFoundError(`${this.modelName} not found.`);
    }
  }

  async validateDelete(id) {
    const existingRecord = await this.repository.get(id);
    if (!existingRecord) {
      error.throwNotFoundError(`${this.modelName} not found.`);
    }
  }
};
