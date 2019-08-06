const error = require('../services/error');
const companyRepository = require('../repositories/company');
const Validator = require('./crudValidator');

class TimetableValidator extends Validator {
  async validateCreate(timetable) {
    if (timetable.id !== undefined) {
      error.throwValidationError('Invalid timetable format.');
    }

    const existingTimetable = await this.repository.getByPropsNonParanoid(timetable);
    if (existingTimetable) {
      error.throwValidationError('Timetable already exists.');
    }
  }

  async validateUpdate(id, data) {
    if (data.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    await validateCompany(data, 'update');

    const existingTimetable = await this.repository.get(id);
    if (!existingTimetable) {
      error.throwNotFoundError('Timetable not found.');
    }
  }

  async validateCompany(timetable, operation) {
    if (timetable.companyId !== undefined) {
      const company = await companyRepository.get(timetable.companyId);
      if (!company) {
        error.throwNotFoundError('Company not found.');
      }
    } else {
      if (operation === 'create') {
        error.throwValidationError('Invalid timetable format.');
      }
    }
  }
};

module.exports = new TimetableValidator({
  repositoryName: 'timetable',
  modelName: 'Timetable',
});
