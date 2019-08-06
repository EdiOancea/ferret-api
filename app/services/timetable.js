const CrudService = require('./crudService');

class TimetableService extends CrudService {
  async create(timetable) {
    await this.validator.validateCreate(timetable);
    const createdTimetable = await this.repository.create(timetable);

    return createdTimetable;
  }

  async update(id, data) {
    await this.validator.validateUpdate(id, data);
    await this.repository.update(id, data);

    return await this.get(id);
  }
};

module.exports = new TimetableService({
  modelName: 'Timetable',
  repositoryName: 'timetable',
  validatorName: 'timetable',
});
