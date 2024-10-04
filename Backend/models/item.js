'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
        // Many-to-Many association
        Item.belongsToMany(models.User, {
          through: models.UserItem,
          foreignKey: 'itemId',
          as: 'interestedUsers', // Alias for users interested in the item
        });
        
        Item.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'seller', // Use 'seller' to match your include
        });
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