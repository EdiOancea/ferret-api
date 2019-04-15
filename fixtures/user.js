const createUser = require('./utils').createUser;

module.exports = {
  users: [
    { email: 'test.email1@gmail.ro' },
    { email: 'test.email2@gmail.ro', deleted_at: new Date() },
    { email: 'test.email3@gmail.ro' },
    { email: 'test.email4@gmail.ro' },
  ].map(user => createUser(user)),
};
