module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('fields_of_activity', [
  {
    id: 1,
    name: 'Engineering',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 2,
    name: 'Retailer',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 3,
    name: 'Producer of equipment',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 4,
    name: 'Education',
    created_at: new Date(),
    updated_at: new Date(),
  },
  ],
  {
    validate: true,
    individualHooks: true,
  }),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('fields_of_activity', null, {}),
};
