const createUser = require('./utils').createUser;
const companyFixture = require('./company');

module.exports = {
  ...companyFixture,
  users: [
    {
      email: 'test.email2@gmail.ro',
      deleted_at: new Date(),
    },
    {
      email: 'test.email1@gmail.ro',
      company_id: 'companies:0',
    },
    { email: 'test.email3@gmail.ro' },
  ].map(user => createUser(user)),
};
