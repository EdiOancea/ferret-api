const error = require('../services/error');
const Validator = require('./crudValidator');

class FieldOfActivityValidator extends Validator {
  async validateCreate(fieldOfActivity) {
    if (!fieldOfActivity.name || fieldOfActivity.id) {
      error.throwValidationError('Invalid field of activity format.');
    }

    const existingFieldOfActivity = await this.repository.getByPropsNonParanoid(fieldOfActivity);
    if (existingFieldOfActivity) {
      error.throwValidationError('Field of activity already exists.');
    }
  }
};

module.exports = new FieldOfActivityValidator({
  repositoryName: 'fieldOfActivity',
  modelName: 'Field of activity',
});
