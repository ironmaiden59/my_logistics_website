'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
      Message.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
      Message.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' });
    }
  }

  Message.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null in case the seller is not logged in
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id',
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id',
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Items', 
        key: 'id',
      },
    },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current timestamp
  },
  }, {
    sequelize,
    modelName: 'Message',
  });

  return Message;
};