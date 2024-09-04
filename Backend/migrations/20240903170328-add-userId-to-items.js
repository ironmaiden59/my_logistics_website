'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Items', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow null values temporarily
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Here, you might need to set the userId for existing records manually.
    // E.g., assign a default userId to all existing items:
    // await queryInterface.sequelize.query('UPDATE "Items" SET "userId" = <default_user_id>');

    // Then, set the column to NOT NULL
    await queryInterface.changeColumn('Items', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false, // Add the NOT NULL constraint after setting default values
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Items', 'userId');
  }
};
