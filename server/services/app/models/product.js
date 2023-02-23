"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "authorId", onDelete: "cascade", onUpdate: "cascade" });
      Product.belongsTo(models.Category, { foreignKey: "categoryId", onDelete: "cascade", onUpdate: "cascade" });
      Product.hasMany(models.Image, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade", hooks: true });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name cannot be null",
          },
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      slug: DataTypes.STRING,

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Description cannot be null",
          },
          notEmpty: {
            msg: "Description cannot be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Price cannot be null",
          },
          notEmpty: {
            msg: "Price cannot be empty",
          },
        },
      },
      mainImg: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Main Image cannot be null",
          },
          notEmpty: {
            msg: "Main Image cannot be empty",
          },
        },
      },
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  function slugGenerate(str) {
    return str.split(" ").join("-");
  }

  Product.beforeCreate((product) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const nameProduct = `${randomNumber} ${product.name}`;
    const lowerCase = nameProduct.toLowerCase();
    const createSlug = slugGenerate(lowerCase);
    product.slug = createSlug;
  });

  return Product;
};
