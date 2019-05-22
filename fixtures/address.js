const createAddress = require('./utils').createAddress;
const companyFixture = require('./company');

module.exports = {
  ...companyFixture,
  addresses: [
    {
      country: 'Test-CountryOne',
      apartment_number: 1,
    }, {
      street_name: 'Test-StreetTwo',
      deleted_at: new Date(),
    },
    { country: 'Test-CountryThree' },
    { country: 'Test-CountryFour' },
  ].map(address => createAddress(address)),
};
