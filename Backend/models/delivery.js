'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    static associate(models) {
      // associations can be defined here
      Delivery.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  Delivery.init({
    productId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    estimatedDelivery: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Delivery',
  });

  return Delivery;
};