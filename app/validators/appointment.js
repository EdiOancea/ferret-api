const companyRepository = require('../repositories/company');
const error = require('../services/error');
const Validator = require('./crudValidator');

class AppointmentValidator extends Validator {
  async validateCreate(appointment) {
    if (appointment.id !== undefined) {
      error.throwValidationError('Invalid appointment format.');
    }

    await this.validateCompany(appointment, 'create');

    const existingAppointment = await this.repository.getByPropsNonParanoid(appointment);
    if (existingAppointment) {
      error.throwValidationError('Appointment already exists.');
    }

    const overlappedAppointments = await this.repository.getOverlappedAppointments(
      appointment.startTime,
      appointment.endTime,
    );
    if (overlappedAppointments.length > 0) {
      error.throwValidationError('Appointment is overlapping.');
    }
  }

  async validateUpdate(id, data) {
    if (data.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    await this.validateCompany(data, 'update');

    const appointmentToEdit = await this.repository.get(Number(id));
    if (!appointmentToEdit) {
      error.throwNotFoundError('Appointment not found.');
    }

    const startTimeTest = data.startTime || appointmentToEdit.startTime;
    const endTimeTest = data.endTime || appointmentToEdit.endTime;
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
  }

  async validateCompany(appointment, operation) {
    if (appointment.companyId !== undefined) {
      const company = await companyRepository.get(appointment.companyId);
      if (!company) {
        error.throwNotFoundError('Company not found.');
      }
    } else {
      if (operation === 'create') {
        error.throwValidationError('Invalid appointment format.');
      }
    }
  }
};

module.exports = new AppointmentValidator({
  repositoryName: 'appointment',
  modelName: 'Appointment',
});
