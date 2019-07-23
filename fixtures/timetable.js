const createTimetable = require('./utils').createTimetable;
const companyFixture = require('./company');

module.exports = {
  ...companyFixture,
  timetables: [
    {
      day: 'Monday',
      start: new Date('March 17, 2019 08:01:00'),
      end: new Date('March 17, 2019 09:00:00'),
    },
  ].map(timetable => createTimetable(timetable)),
};
