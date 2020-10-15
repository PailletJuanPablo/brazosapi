'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {    
    await queryInterface.bulkInsert('Testimonies', [{
      name: 'Testimonio 1',
      content: 'Contenido de testimonio',
      image: 'https://miro.medium.com/max/15904/1*9L6543aM8rKDKrd0vi0n4g.jpeg',
      organizationId: 1,
      createdAt: new Date
    },
    {
      name: 'Testimonio 2',
      content: 'Contenido de testimonio',
      image: 'https://miro.medium.com/max/15904/1*9L6543aM8rKDKrd0vi0n4g.jpeg',
      organizationId: 1,
      createdAt: new Date
    },
    {
      name: 'Testimonio 3',
      content: 'Contenido de testimonio',
      image: 'https://miro.medium.com/max/15904/1*9L6543aM8rKDKrd0vi0n4g.jpeg',
      organizationId: 1,
      createdAt: new Date
    }    
  ], {});
  },
  down: async (queryInterface, Sequelize) => {
  }
};
