const {Sequelize} = require('sequelize');
const {development} = require('./config');

const sequelize = new Sequelize(
    development.database,
    development.username,
    development.password,
    {
    host: development.host,
    dialect: 'mysql'
});

//Conectarse a la base de datos
const conectarDB = async () =>{
    try {
       await sequelize.sync({ alter:true })
        console.log("DB Conectada");
    }
     catch (error) {
        console.log("ERROR al conectarse a DB",error );
    }
}

module.exports = {sequelize, conectarDB };