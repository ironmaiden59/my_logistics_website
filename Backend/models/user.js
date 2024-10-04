'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        // Many-to-Many association
        User.belongsToMany(models.Item, {
          through: models.UserItem,
          foreignKey: 'userId',
          as: 'interestedItems', // Alias for items the user is interested in
        });
        
        User.hasMany(models.Item, {
          foreignKey: 'userId',
          as: 'items', // Alias for items the user is selling
        });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};