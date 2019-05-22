const createUser = user => ({
  first_name: 'Test First Name',
  last_name: 'Testlastname',
  password: '$2a$10$Fex1ChEw5YOneQL02/Pjl.CZ4wpxc/sq6TbzgmFwT/SIHn0lX6fTS', // "parolatest"
  rating: 0,
  company_id: null,
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  ...user,
});

const createAddress = address => ({
  country: 'Test-Country',
  city: 'Test-City',
  street_name: 'Test street Name',
  street_number: 0,
  apartment_number: 0,
  company_id: 'companies:0',
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  ...address,
});

const createFieldOfActivity = field => ({
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  ...field,
});

const createCompany = company => ({
  rating: 0,
  field_of_activity_id: 'fields_of_activity:0',
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  ...company,
});

module.exports = {
  createUser,
  createAddress,
  createFieldOfActivity,
  createCompany,
};
