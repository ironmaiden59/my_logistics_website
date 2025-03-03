'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Messages', 'senderName', {
      type: Sequelize.STRING,
      allowNull: true, // Allow null as specified in your model
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Messages', 'senderName');
  }
};
