const createAppointment = require('./utils').createAppointment;
const companyFixture = require('./company');

module.exports = {
  ...companyFixture,
  appointments: [
    {
      start_time: new Date('March 17, 2019 08:01:00'),
      end_time: new Date('March 17, 2019 09:00:00'),
      status: 'accepted',
    },
    {
      start_time: new Date('March 17, 2019 09:01:00'),
      end_time: new Date('March 17, 2019 10:00:00'),
      status: 'rejected',
      deleted_at: new Date(),
    },
    {
      start_time: new Date('March 17, 2019 09:01:00'),
      end_time: new Date('March 17, 2019 10:00:00'),
    },
    {
      start_time: new Date('March 17, 2019 10:01:00'),
      end_time: new Date('March 17, 2019 11:00:00'),
    },
  ].map(appointment => createAppointment(appointment)),
};
