module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('addresses', {
    country: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      unique: 'compositeIndex',
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid country format.',
        },
        is: {
          args: /^[a-zA-Z.\s'-]{3,250}$/,
          msg: 'Invalid country format.',
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      unique: 'compositeIndex',
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid city format.',
        },
        is: {
          args: /^[a-zA-Z.\s'-]{3,250}$/,
          msg: 'Invalid city format.',
        },
      },
    },
    streetName: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      unique: 'compositeIndex',
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid street name format.',
        },
        is: {
          args: /^[a-zA-Z.\s'-]{3,250}$/,
          msg: 'Invalid street name format.',
        },
      },
    },
    streetNumber: {
      type: DataTypes.INTEGER,
      defaultValue: -1,
      allowNull: false,
      unique: 'compositeIndex',
      validate: {
        min: {
          args: [0],
          msg: 'Invalid street number.',
        },
        max: {
          args: 1000,
          msg: 'Invalid street number.',
        },
      },
    },
    apartmentNumber: {
      type: DataTypes.INTEGER,
      defaultValue: -1,
      allowNull: false,
      unique: 'compositeIndex',
      validate: {
        min: {
          args: [0],
          msg: 'Invalid apartment number.',
        },
        max: {
          args: 1000,
          msg: 'Invalid apartment number.',
        },
      },
    },
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    paranoid: true,
  });

  Address.associate = models => {
    Address.belongsTo(models.companies, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    });
  };

  return Address;
};
