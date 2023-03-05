const getBookModel = (sequelize, { DataTypes }) => {
  const Book = sequelize.define('book', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    author: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Collection);
  };

  return Book;
};

export default getBookModel;
