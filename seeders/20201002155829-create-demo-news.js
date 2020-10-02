'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Entries', [{
      title: 'Nueva Novedad',
      content: 'Contenido de novedad',
      image: 'Imagen',
      contentType: "tipo",
      category: "",
      createdAt: new Date,
      updatedAt: new Date
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
