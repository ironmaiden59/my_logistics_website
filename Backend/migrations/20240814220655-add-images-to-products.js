module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'images', {
      type: Sequelize.ARRAY(Sequelize.STRING), // This allows for an array of image URLs
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'images');
  }
};
