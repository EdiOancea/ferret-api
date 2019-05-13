const error = require('../services/error');

module.exports = class CrudService {
  constructor(props) {
    this.modelName = props.modelName;
    this.repository = require(`../repositories/${props.repositoryName}`);
  }

  async get(id) {
    let found = await this.repository.get(id);
    if (!found) {
      error.throwNotFoundError(`${this.modelName} not found.`);
    }

    return found;
  }

  async delete(id) {
    await this.get(id);
    await this.repository.delete(id);
    const deleted = await this.repository.getNonParanoid(id);

    return deleted;
  }
};
