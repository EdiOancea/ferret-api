const createCompany = require('./utils').createCompany;
const fieldOfActivityFixture = require('./fieldOfActivity');

module.exports = {
  ...fieldOfActivityFixture,
  companies: [
    {
      name: 'TestCompany',
      timetable: 'TestTimetable'
    },
    {
      name: 'TestCompanyDoi',
      timetable: 'TestTimetableDoi',
      deleted_at: new Date(),
    },
    {
      name: 'TestCompanyTrei',
      timetable: 'TestTimetableTrei'
    },
  ].map(company => createCompany(company)),
};
