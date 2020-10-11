'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     Add seed commands here.
     
      Example:
      await queryInterface.bulkInsert('Slides', [{
        text: 'John Doe',
        description: false
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
