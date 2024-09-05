'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      // Token belongs to an Item and a Buyer (user)
      Token.belongsTo(models.Item, { foreignKey: 'itemId' });
      Token.belongsTo(models.User, { foreignKey: 'buyerId' });
    }
  }

  Token.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Items',
        key: 'id',
      },
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Token',
  });

  return Token;
};