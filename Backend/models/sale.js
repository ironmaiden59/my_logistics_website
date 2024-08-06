'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    static associate(models) {
      // associations can be defined here
      Sale.belongsTo(models.User, { foreignKey: 'userId' });
      Sale.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  Sale.init({
    productId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sale',
  });

  return Sale;
};