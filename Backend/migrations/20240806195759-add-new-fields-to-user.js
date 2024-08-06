'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: '',
    });
    await queryInterface.addColumn('Users', 'receiveNotifications', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('Users', 'preferredDeliveryOption', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'standard',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.removeColumn('Users', 'receiveNotifications');
    await queryInterface.removeColumn('Users', 'preferredDeliveryOption');
  }
};
