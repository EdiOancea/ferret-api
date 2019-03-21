'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name',
      unique: 'compositeIndex',
      validate: {
        len: [3, 250],
        is: /([A-Z][a-z]{2,20}\s)*([A-Z][a-z]{2,20})$/
      },
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name',
      unique: 'compositeIndex',
      validate: {
        is: /^[A-Z][a-z]{2,20}$/,
      },
    },
    email: {
      type: Sequelize.STRING,
      field: 'email',
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      field: 'password',
      allowNull: false,
    },
    rating: {
      type: Sequelize.DOUBLE,
      field: 'rating',
      min: 0,
      max: 10,
      defaultValue: 0.0,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      field: 'active',
      defaultValue: true,
      allowNull: false,
    },
  }, {});
  
  return User;
};
