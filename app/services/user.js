const CrudService = require('./crudService');

class UserService extends CrudService {
  async create(user) {
    await this.validator.validateCreate(user);
    const createdUser = await this.repository.create(user);

    return await this.get(createdUser.id);
  }

  async update(id, data) {
    await this.validator.validateUpdate(id, data);
    await this.repository.update(id, data);

    return await this.get(id);
  }
};

module.exports = new UserService({
  repositoryName: 'user',
  modelName: 'User',
  validatorName: 'user',
});
