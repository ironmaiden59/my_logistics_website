'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // define association here
    }
  }

  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Item',
  });

  return Item;
};