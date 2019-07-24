module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startTime: {
        field: 'start_time',
        type: Sequelize.DATE
      },
      endTime: {
        field: 'end_time',
        type: Sequelize.DATE
      },
      status: {
        field: 'status',
        type: Sequelize.STRING
      },
      companyId: {
        field: 'company_id',
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('appointments');
  }
};
