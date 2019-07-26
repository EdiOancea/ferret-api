const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid first name format.',
        },
        is: {
          args: /^[a-zA-Z.\s'-]{3,250}$/,
          msg: 'Invalid first name format.',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid last name format.',
        },
        is: {
          args: /^[a-zA-Z.\s'-]{3,250}$/,
          msg: 'Invalid last name format.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: '',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid email format.',
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password needs to be between 8 to 20 characters long.',
        },
        len: {
          args: [8, 20],
          msg: 'Password needs to be between 8 to 20 characters long.',
        },
      },
    },
    rating: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Rating can not be lower than 0.',
        },
        min: {
          args: [0],
          msg: 'Rating can not be lower than 0.',
        },
        max: {
          args: 10,
          msg: 'Rating can not be higher than 10.',
        },
      },
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    defaultScope: {
      attributes: {
        exclude: ['password'], // Does not return password on select querries.
      },
    },
    scopes: {
      auth: {
        attributes: ['password', 'id'],
      },
    },
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10);
        user.email = user.email.toLowerCase();
      },

      beforeUpdate: async (user, options) => {
        if (user.changed('password')) {
          user.password = bcrypt.hashSync(user.password, 10);
        }

        if (user.changed('email')) {
          user.email = user.email.toLowerCase();
        }
      },
    },
  });

  User.associate = models => {
    User.belongsTo(models.companies, {
      foreignKey: 'companyId',
      onDelete: 'SET NULL',
    });
    User.hasMany(models.company_reviews, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
