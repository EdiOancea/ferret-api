module.exports = (sequelize, DataTypes) => {
  const CompanyReview = sequelize.define('company_reviews', {
    comment: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid comment format.',
        },
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invalid rating format.',
        },
        min: {
          args: [0],
          msg: 'Invalid rating format.',
        },
        max: {
          args: 5,
          msg: 'Invalid rating format.',
        },
      },
    },
  }, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
  });

  CompanyReview.associate = models => {
    CompanyReview.belongsTo(models.companies, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    });
    CompanyReview.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return CompanyReview;
};
