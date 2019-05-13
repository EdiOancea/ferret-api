const CrudService = require('./CrudService');
const fieldOfActivityRepository = require('../repositories/fieldOfActivity');
const error = require('./error');

class FieldOfActivityService extends CrudService {
  async create(fieldOfActivity) {
    if (!fieldOfActivity.name || fieldOfActivity.id) {
      error.throwValidationError('Invalid field of activity format.');
    }

    const fieldExists = await fieldOfActivityRepository.getByPropsNonParanoid(fieldOfActivity);
    if (fieldExists) {
      error.throwValidationError('Field of activity already exists.');
    }

    const createdFieldOfActivity = await fieldOfActivityRepository.create(fieldOfActivity);

    return await this.get(createdFieldOfActivity.id);
  }

  async update(id, newData) {
    if (newData.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    await this.get(id);
    await fieldOfActivityRepository.update(id, newData);

    return await this.get(id);
  }
};

module.exports = new FieldOfActivityService({
  repositoryName: 'fieldOfActivity',
  modelName: 'Field of activity',
});
