'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      first_name: "Anod Catod",
      last_name: "Eduard",
      email: "oancea.eduard66@gmail.ro",
      password: "algotech",
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      first_name: "Anod Catod",
    }, {});
  },
};
