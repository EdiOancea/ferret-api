const CrudService = require('./crudService');

class AppointmentService extends CrudService {
  async create(appointment, companyId) {
    const newAppointment = {
      ...appointment,
      companyId,
    };
    await this.validator.validateCreate(newAppointment);
    const createdAppointment = await this.repository.create(newAppointment);

    return createdAppointment;
  }

  async update(id, data) {
    await this.validator.validateUpdate(id, data);
    await this.repository.update(id, data);

    return await this.get(Number(id));
  }
};

module.exports = new AppointmentService({
  modelName: 'Appointment',
  repositoryName: 'appointment',
  validatorName: 'appointment',
});
