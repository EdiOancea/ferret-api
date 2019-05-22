const createCompany = require('./utils').createCompany;
const fieldOfActivityFixture = require('./fieldOfActivity');

module.exports = {
  ...fieldOfActivityFixture,
  companies: [
    { name: 'TestCompany' },
    {
      name: 'TestCompanyDoi',
      deleted_at: new Date(),
    },
    { name: 'TestCompanyTrei' },
  ].map(company => createCompany(company)),
};
