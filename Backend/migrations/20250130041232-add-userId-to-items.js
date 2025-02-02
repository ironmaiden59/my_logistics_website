'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Items', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,              // or true, if you want it nullable
      references: {
        model: 'Users',             // must match the *table name* from your create-users migration
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',           // or 'SET NULL' if you prefer
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Items', 'userId');
  }
};
