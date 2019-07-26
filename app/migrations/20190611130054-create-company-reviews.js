module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('company_reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'users',
          key: 'id',
        },
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
      comment: {
        field: 'comment',
        type: Sequelize.STRING
      },
      rating: {
        field: 'rating',
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('company_reviews');
  }
};
