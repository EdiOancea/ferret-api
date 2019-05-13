const db = require('../models');

module.exports = class Repository {
  constructor(name) {
    this.modelName = name;
  }

  getByPropsNonParanoid(props) {
    return db[this.modelName].findOne({
      where: { ...props },
      paranoid: false,
    });
  }

  get(id) {
    return db[this.modelName].findOne({ where: { id } });
  }

  getNonParanoid(id) {
    return db[this.modelName].findOne({
      where: { id },
      paranoid: false,
    });
  }

  create(newObject) {
    return db[this.modelName].create(newObject);
  }

  delete(id) {
    return db[this.modelName].destroy({ where: { id } });
  }

  update(id, newObjectData) {
    return db[this.modelName].update(newObjectData, {
      where: {
        id,
        deletedAt: null,
      },
      individualHooks: true,
    });
  }
};
