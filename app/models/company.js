module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('companies', {
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid company name format.',
        },
        is: {
          args: /^[a-zA-Z.\s'-]{3,250}$/,
          msg: 'Invalid company name format.',
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
    timetable: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid timetable format.',
        },
      },
    },
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
  });

  Company.associate = models => {
    Company.belongsTo(models.fields_of_activity, {
      foreignKey: 'fieldOfActivityId',
      onDelete: 'CASCADE',
    });
    Company.hasMany(models.user, {
      foreignKey: 'companyId',
      onDelete: 'SET NULL',
    });
    Company.hasMany(models.addresses, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    });
    Company.hasMany(models.timetables, {
      foreignKey: 'companyId',
      onDelete: 'SET NULL',
    });
  };

  return Company;
};
