'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    await queryInterface.bulkInsert('Entries', [{
      title: 'Novedad 1',
      content: 'Contenido de novedad',
      image: 'https://miro.medium.com/max/15904/1*9L6543aM8rKDKrd0vi0n4g.jpeg',
      contentType: "news",
      category: "Novedad",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      title: 'Novedad 2',
      content: 'Contenido de novedad',
      image: 'https://miro.medium.com/max/15904/1*9L6543aM8rKDKrd0vi0n4g.jpeg',
      contentType: "news",
      category: "Novedad",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      title: 'Novedad 3',
      content: 'Contenido de novedad',
      image: 'https://miro.medium.com/max/15904/1*9L6543aM8rKDKrd0vi0n4g.jpeg',
      contentType: "news",
      category: "Novedad",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      title: 'Evento 1',
      content: 'Contenido de evento',
      image: 'https://miro.medium.com/max/15904/1*9L6543aM8rKDKrd0vi0n4g.jpeg',
      contentType: "event",
      category: "Evento",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      title: 'Evento 2',
      content: 'Contenido de evento',
      image: 'https://miro.medium.com/max/15904/1*9L6543aM8rKDKrd0vi0n4g.jpeg',
      contentType: "event",
      category: "Evento",
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      title: 'Evento 3',
      content: 'Contenido de evento',
      image: 'https://miro.medium.com/max/15904/1*9L6543aM8rKDKrd0vi0n4g.jpeg',
      contentType: "event",
      category: "Evento",
      createdAt: new Date,
      updatedAt: new Date
    }
  ], {});
  },
  down: async (queryInterface, Sequelize) => {
  }
};
