'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // Define associations here if needed
      Item.belongsTo(models.User, { foreignKey: 'userId', as: 'seller' });
    }
  }

  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming you have a Users table
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Item',
  });

  return Item;
};