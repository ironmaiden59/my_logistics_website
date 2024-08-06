'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // associations can be defined here
      Message.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Message.init({
    userId: DataTypes.INTEGER,
    senderName: DataTypes.STRING,
    content: DataTypes.TEXT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Message',
  });

  return Message;
};