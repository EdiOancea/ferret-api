const db = require('../app/models');

module.exports = async () => {
  await db.sequelize.sync({
    force: true,
  });
};
