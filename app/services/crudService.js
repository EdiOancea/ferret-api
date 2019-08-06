const error = require('../services/error');

module.exports = class CrudService {
  constructor(props) {
    this.modelName = props.modelName;
    this.repository = require(`../repositories/${props.repositoryName}`);
    this.validator = require(`../validators/${props.validatorName}`);
  }

  async get(id) {
    const found = await this.repository.get(id);
    if (!found) {
      error.throwNotFoundError(`${this.modelName} not found.`);
    }

    return found;
  }

  async delete(id) {
    await this.validator.validateDelete(id);
    await this.repository.delete(id);
    const deleted = await this.repository.getNonParanoid(id);

    return deleted;
  }

  async getAll() {
    return await this.repository.getAll();
  }
};
