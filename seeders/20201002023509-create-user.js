'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Administrador',
      lastName: 'Brazos Abiertos',
      email: 'brazosabiertos@alkemy.com',
      password: await bcrypt.hash(`Br4z0s*`,10),
      roleId: 1,
      organizationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface, Sequelize) => { 
    return queryInterface.bulkDelete('Users', null, {});   
  }
};
