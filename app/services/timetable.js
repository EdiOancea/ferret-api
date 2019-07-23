const companyService = require('./company');
const error = require('../services/error');
const CrudService = require('./crudService');

class TimetableService extends CrudService {
  async create(timetable) {
    if (timetable.id !== undefined) {
      error.throwValidationError('Invalid timetable format.');
    }

    const timetableExists = await this.repository.getByPropsNonParanoid({ ...timetable });
    if (timetableExists) {
      error.throwValidationError('Timetable already exists.');
    }

    const createdTimetable = await this.repository.create(timetable);

    return await this.get(createdTimetable.id);
  }

  async update(id, newData) {
    if (newData.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    if (newData.companyId !== undefined) {
      const fieldExists = await companyService.get(newData.companyId);
    }

    await this.get(id);
    await this.repository.update(id, newData);

    return await this.get(id);
  }
};

module.exports = new TimetableService({
  modelName: 'Timetable',
  repositoryName: 'timetable',
});
