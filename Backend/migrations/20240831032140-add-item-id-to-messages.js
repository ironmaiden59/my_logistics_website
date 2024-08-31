'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Messages', 'itemId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Items', // Name of the Items table
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Messages', 'itemId');
  },
};
