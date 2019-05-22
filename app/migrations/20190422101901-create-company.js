module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fieldOfActivityId: {
        field: 'field_of_activity_id',
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'fields_of_activity',
          key: 'id',
        },
      },
      name: {
        field: 'name',
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
      },
    })
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.dropTable('companies')
  ),
};
