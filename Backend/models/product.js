'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // associations can be defined here
      Product.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Store multiple image URLs
      allowNull: true,
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};