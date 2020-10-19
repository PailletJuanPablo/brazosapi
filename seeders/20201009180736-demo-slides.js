'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     //Add seed commands here.
     
      Example:
      await queryInterface.bulkInsert('Slides', [{
        bienvenida: 'bienvenidos a la Fundación Brazos Abiertos',
        image: 'url de imagen',
        text: 'texto de ejemplo slider',
        order: '1'
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
