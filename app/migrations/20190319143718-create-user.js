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
        field: 'first_name',
        type: Sequelize.STRING,
      },
      lastName: {
        field: 'last_name',
        type: Sequelize.STRING,
      },
      email: {
        field: 'email',
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        field: 'password',
        type: Sequelize.STRING,
      },
      rating: {
        field: 'rating',
        type: Sequelize.DOUBLE,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
