module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.sequelize.transaction(t => (
      Promise.all([
        queryInterface.addColumn(
          'users',
          'company_id', {
            type: Sequelize.INTEGER,
            onDelete: 'SET NULL',
            references: {
              model: 'companies',
              key: 'id',
            },
          }, {
            transaction: t,
          },
        ),
        queryInterface.addColumn(
          'addresses',
          'company_id', {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'companies',
              key: 'id',
            },
          }, {
            transaction: t,
          },
        ),
      ])
    ))
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.sequelize.transaction(t => (
      Promise.all([
        queryInterface.removeColumn('users', 'company_id', { transaction: t }),
        queryInterface.removeColumn('addresses', 'company_id', { transaction: t }),
      ])
    ))
  ),
};
