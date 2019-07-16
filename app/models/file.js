module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('files', {
    originalFileName: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      unique: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid file path format.',
        },
      },
    },
    path: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid file path format.',
        },
      },
    },
    entityType: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid file entity type format.',
        },
      },
    },
    entityId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid file entity id format.',
        },
      },
    },
  }, {
    reezeTableName: true,
    timestamps: true,
    underscored: true,
    paranoid: true,
  });

  return File;
};
