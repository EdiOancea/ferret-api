const CrudService = require('./CrudService');

class FieldOfActivityService extends CrudService {
  async create(fieldOfActivity) {
    await this.validator.validateCreate(fieldOfActivity);
    const createdFieldOfActivity = await this.repository.create(fieldOfActivity);

    return createdFieldOfActivity;
  }

  async update(id, data) {
    await this.validator.validateUpdate(id, data);
    await this.repository.update(id, data);

    return await this.get(id);
  }
};

module.exports = new FieldOfActivityService({
  repositoryName: 'fieldOfActivity',
  modelName: 'Field of activity',
  validatorName: 'fieldOfActivity',
});
