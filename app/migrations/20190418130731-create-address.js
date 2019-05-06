module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country: {
        field: 'country',
        type: Sequelize.STRING,
      },
      city: {
        field: 'city',
        type: Sequelize.STRING,
      },
      streetName: {
        field: 'street_name',
        type: Sequelize.STRING,
      },
      streetNumber: {
        field: 'street_number',
        type: Sequelize.INTEGER,
      },
      apartmentNumber: {
        field: 'apartment_number',
        type: Sequelize.INTEGER,
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
    queryInterface.dropTable('addresses')
  ),
};
