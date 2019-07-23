module.exports = (sequelize, DataTypes) => {
  const Timetable = sequelize.define('timetables', {
    day: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid day format.',
        },
        isDayOfWeek(value) {
          if (!['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(value)) {
            throw new Error('Only days of week are allowed!');
          }
        }
      },
    },
    start: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid start time format.',
        },
      },
    },
    end: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid end time format.',
        },
      },
    },
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
  });

  Timetable.associate = models => {
    Timetable.belongsTo(models.companies, {
      foreignKey: 'companyId',
      onDelete: 'SET NULL',
    });
  };

  return Timetable;
};
