'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
      name: 'Admin',
      description: 'Admin',
      updatedAt: new Date,
      createdAt: new Date
    },
    {
      name: 'User',
      description: 'User',
      updatedAt: new Date,
      createdAt: new Date
    }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
