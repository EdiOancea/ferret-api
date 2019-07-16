module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('files', 'original_file_name', {
      type: Sequelize.STRING
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('files', 'original_file_name');
  }
};
