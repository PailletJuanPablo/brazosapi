'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Organizations', [{
      name: 'Brazos Abiertos',
      image: 'https://drive.google.com/uc?export=view&id=1SO5FoXAdaeftX701CiKp6DRr7jdgMf3C',
      description: 'Descripción de organización de prueba 1',
      phone: 123456,
      address: 'Dirección demo',
      welcomeText: 'Todos podemos ayudar a alguien',
      facebookUrl: 'https://www.facebook.com',
      instagramUrl: 'https://www.instagram.com',
      linkedinUrl: 'https://www.linkedin.com',
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
