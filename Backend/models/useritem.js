'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserItem = sequelize.define('UserItem', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the target model (table name)
        key: 'id',      // Key in the target model
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Items', // Name of the target model (table name)
        key: 'id',      // Key in the target model
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {});

  UserItem.associate = function(models) {
    // Associations
    UserItem.belongsTo(models.User, { foreignKey: 'userId' });
    UserItem.belongsTo(models.Item, { foreignKey: 'itemId' });
  };

  return UserItem;
};