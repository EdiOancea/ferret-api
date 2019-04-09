const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      first_name: "Test First Name",
      last_name: "Testlastname",
      email: "test.email1@gmail.ro",
      password: "parolatest1",
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: 2,
      first_name: "Test First Name Two",
      last_name: "Testlastnametwo",
      email: "test.email2@gmail.ro",
      password: "parolatest2",
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: 3,
      first_name: "Test First Name Three",
      last_name: "Testlastnamethree",
      email: "test.email3@gmail.ro",
      password: "parolatest3",
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: 4,
      first_name: "Test First Name Three",
      last_name: "Testlastnamethree",
      email: "test.email4@gmail.ro",
      password: "parolatest4",
      created_at: new Date(),
      updated_at: new Date(),
    }].forEach(user => {
      user.password = await hashPassword(user.password);
    }), {
      validate: true,
      individualHooks: true
    });
  },

  down: (queryInterface, Sequelize) => return queryInterface.bulkDelete('users', null, {}),
}

const hashPassword = async (password) => {
  saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
}
