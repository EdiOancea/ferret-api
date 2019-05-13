const createFieldOfActivity = require('./utils').createFieldOfActivity;

module.exports = {
  fields_of_activity: [
    { name: 'FieldOfActivity' },
    { name: 'FieldOfActivitySters', deleted_at: new Date() },
    { name: 'FieldOfActivityTrei' },
    { name: 'FieldOfActivityPatru' },
  ].map(field => createFieldOfActivity(field)),
};
