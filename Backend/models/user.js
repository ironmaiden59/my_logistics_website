'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      defaultValue: '', // Default to an empty string if no address is provided
    },
    receiveNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to false for notifications
    },
    preferredDeliveryOption: {
      type: DataTypes.STRING,
      defaultValue: 'standard', // Default to 'standard' for delivery options
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};