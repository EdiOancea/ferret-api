module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('appointments', {
    startTime: {
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
    endTime: {
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
    status: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid status format.',
        },
        isValidStatus(value) {
          if (!['pending', 'accepted', 'rejected'].includes(value)) {
            throw new Error('Only statuses of pending, accepted and rejected are allowed.');
          }
        }
      },
    },
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
  });

  Appointment.associate = models => {
    Appointment.belongsTo(models.companies, {
      foreignKey: 'companyId',
      onDelete: 'SET NULL',
    });
  };

  return Appointment;
};
