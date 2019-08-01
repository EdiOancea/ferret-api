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

  getAllByProps(props) {
    return db[this.modelName].findAll({
      where: { ...props },
      raw: true,
    });
  }

  getAllByPropsNonParanoid(props) {
    return db[this.modelName].findAll({
      where: { ...props },
      paranoid: false,
      raw: true,
    });
  }

  get(id) {
    return db[this.modelName].findOne({
      where: { id },
      raw: true,
    });
  }

  getAll() {
    return db[this.modelName].findAll({ raw: true });
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

  deleteByProps(props) {
    return db[this.modelName].destroy({ where: { ...props } });
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
