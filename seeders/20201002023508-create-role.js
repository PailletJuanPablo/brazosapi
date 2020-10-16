'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
      name: 'Admin',
      description: 'Admin',
      createdAt: new Date
    },
    {
      name: 'User',
      description: 'User',
      createdAt: new Date
    }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
