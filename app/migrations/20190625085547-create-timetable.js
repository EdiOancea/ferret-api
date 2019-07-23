module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('timetables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      day: {
        field: 'day',
        type: Sequelize.STRING
      },
      start: {
        field: 'start',
        type: Sequelize.DATE
      },
      end: {
        field: 'end',
        type: Sequelize.DATE
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
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('timetables');
  }
};
