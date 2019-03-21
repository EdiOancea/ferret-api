'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        field: 'first_name',
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        field: 'last_name',
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        field: 'email',
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        field: 'password',
        type: Sequelize.STRING,
      },
      rating: {
        allowNull: false,
        field: 'rating',
        defaultValue: 0.0,
        type: Sequelize.DOUBLE,
      },
      active: {
        allowNull: false,
        defaultValue: true,
        field: 'active',
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
