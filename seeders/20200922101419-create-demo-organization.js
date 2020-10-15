'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [{
      name: 'Brazos Abiertos',
      image: 'https://drive.google.com/uc?export=view&id=1SO5FoXAdaeftX701CiKp6DRr7jdgMf3C',
      description: ' Brindamos asistencia y acompañamiento, tanto material como psicológica, a familias de bajos recursos económicos, de estratos sociales vulnerables y en las que un integrante menor de 15 años está atravesando un tratamiento médico de alguna enfermedad terminal, poco frecuente o grave. La asistencia es de forma parcial o total en el tiempo que se encuentren en tratamiento médico. Se realiza un acuerdo con la familia (dependiendo el caso, complejidad de la enfermedad, situación económica, entre otros) y en el transcurso de ese tiempo acordado los acompañamos: psicológicamente, con visitas continuas brindando acompañamiento en el hospital y en sus hogares. La asistencia es en materia de alimentos, ropa y calzado, elementos de higiene personal y del hogar. Así como también hacemos regalos personalizados a cada nene/nena asistido/a y a sus hermanitos/as para fechas especiales: inicio de clases, día del niño, navidad.',
      phone: 123456,
      address: 'Dirección demo',
      welcomeText: 'Todos podemos ayudar a alguien',
      facebookUrl: 'https://www.facebook.com/brazosabiertos/',
      instagramUrl: 'https://www.instagram.com/somosbrazosabiertos/?hl=es',
      linkedinUrl: 'https://www.linkedin.com',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
  }
};
