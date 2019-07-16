const bcrypt = require('bcrypt');

const users = [
  {
    id: 1,
    first_name: 'Test First Name',
    last_name: 'Testlastname',
    email: 'test.email1@gmail.ro',
    password: 'parolatest1',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 2,
    first_name: 'Test First Name Two',
    last_name: 'Testlastnametwo',
    email: 'test.email2@gmail.ro',
    password: 'parolatest2',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 3,
    first_name: 'Test First Name Three',
    last_name: 'Testlastnamethree',
    email: 'test.email3@gmail.ro',
    password: 'parolatest3',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 4,
    first_name: 'Test First Name Three',
    last_name: 'Testlastnamethree',
    email: 'test.email4@gmail.ro',
    password: 'parolatest4',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const usersToAdd = [];
for (const user of users) {
  const password = bcrypt.hashSync(user.password, 10);
  usersToAdd.push({
    ...user,
    password,
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'users',
    usersToAdd,
    {
      validate: true,
      individualHooks: true,
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
    'users',
    null,
    {}
  ),
};
