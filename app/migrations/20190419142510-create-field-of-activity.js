module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('fields_of_activity', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    })
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.dropTable('fields_of_activity')
  ),
};
