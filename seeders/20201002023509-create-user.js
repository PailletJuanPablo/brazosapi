'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password: await bcrypt.hash(`123456789`,10),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Fabiola',
      lastName: 'Rodriguez',
      email: 'comun@comun.com',
      password: await bcrypt.hash(`123456`,10),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface, Sequelize) => { 
    return queryInterface.bulkDelete('Users', null, {});   
  }
};
