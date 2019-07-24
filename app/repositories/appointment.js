const Sequelize = require('sequelize');

const db = require('../models');
const Repository = require('./crudRepository');

const Op = Sequelize.Op;

class AppointmentRepository extends Repository {
  getOverlappedAppointments(startTime, endTime) {
    return db[this.modelName].findAll({
      where: {
        [Op.or]: [
          {
            startTime: {
              [Op.between]: [startTime, endTime],
            },
          },
          {
            endTime: {
              [Op.between]: [startTime, endTime],
            },
          },
        ],
      },
      raw: true,
    });
  }
};

module.exports = new AppointmentRepository('appointments');
