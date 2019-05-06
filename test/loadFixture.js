const sqlFixtures = require('sql-fixtures');
const cleandb = require('./cleandb');

const dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'ferret',
    password: '',
    database: 'test',
    port: 5432,
  },
};

module.exports = async fixture => {
  await cleandb();
  await sqlFixtures.create(dbConfig, fixture, (err, res) => {});
};
