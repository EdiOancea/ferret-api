module.exports = (sequelize, DataTypes) => {
  const FieldOfActivity = sequelize.define('fields_of_activity', {
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid field of activity format.',
        },
        is: {
          args: /^[a-zA-Z.\s'-]{3,250}$/,
          msg: 'Invalid field of activity format.',
        },
      },
    },
  }, {
    paranoid: true,
    freezeTableName: true,
    underscored: true,
  });

  return FieldOfActivity;
};
