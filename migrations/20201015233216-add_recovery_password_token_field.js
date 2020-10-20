'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Users',
      'recovery_password_token',
      Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'recovery_password_token');
  }
};
