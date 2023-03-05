const getCollectionModel = (sequelize, { DataTypes }) => {
  const Collection = sequelize.define('collection', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Collection.associate = (models) => {
    Collection.hasMany(models.Book, { onDelete: 'CASCADE' });
  };

  return Collection;
};

export default getCollectionModel;
