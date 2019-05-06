const createUser = user => ({
  first_name: 'Test First Name',
  last_name: 'Testlastname',
  password: '$2a$10$Fex1ChEw5YOneQL02/Pjl.CZ4wpxc/sq6TbzgmFwT/SIHn0lX6fTS', // "parolatest"
  rating: 5,
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  ...user,
});

const createAddress = address => ({
  country: 'Test-Country',
  city: 'Test-City',
  street_name: 'Test street Name',
  street_number: 3,
  apartment_number: 13,
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  ...address,
});

module.exports = {
  createUser,
  createAddress,
};
