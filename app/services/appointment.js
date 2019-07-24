const CrudService = require('./crudService');
const companyService = require('./company');
const error = require('../services/error');

class AppointmentService extends CrudService {
  async create(appointment, companyId) {
    if (appointment.id !== undefined) {
      error.throwValidationError('Invalid appointment format.');
    }

    const appointmentExists = await this.repository.getByPropsNonParanoid({
      ...appointment,
    });
    if (appointmentExists) {
      error.throwValidationError('Appointment already exists.');
    }

    const overlappedAppointments = await this.repository.getOverlappedAppointments(
      appointment.startTime,
      appointment.endTime,
    );
    if (overlappedAppointments.length > 0) {
      error.throwValidationError('Appointment is overlapping.');
    }

    if (companyId !== undefined) {
      await companyService.get(companyId);
    } else {
      error.throwValidationError('Invalid appointment format.');
    }

    const createdAppointment = await this.repository.create({
      ...appointment,
      companyId,
    });

    return await this.get(createdAppointment.id);
  }

  async update(id, newData) {
    if (newData.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    if (newData.companyId !== undefined) {
      await companyService.get(newData.companyId);
    }

    const appointmentToEdit = await this.get(Number(id));

    const { startTime, endTime } = newData;
    const startTimeTest = startTime || appointmentToEdit.startTime;
    const endTimeTest = endTime || appointmentToEdit.endTime;
    const overlappedAppointments = await this.repository.getOverlappedAppointments(
      startTimeTest,
      endTimeTest,
    );
    if (
      overlappedAppointments.length > 1 ||
      (overlappedAppointments.length === 1 && overlappedAppointments[0].id !== Number(id))
    ) {
      error.throwValidationError('Appointment is overlapping.');
    }

    await this.repository.update(id, newData);

    return await this.get(Number(id));
  }
};

module.exports = new AppointmentService({
  modelName: 'Appointment',
  repositoryName: 'appointment',
});
