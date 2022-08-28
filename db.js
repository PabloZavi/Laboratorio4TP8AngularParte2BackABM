const Sequelize = require('sequelize');
const modeloIntrumento = require('./models/instrumentos');
var mysql = require('mysql');

const sequelize = new Sequelize('instrumentosdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

var mysql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "instrumentosdb"
  });

//Con esto creo la tabla en MySql según el modelo instrumento.js
const Instrumento = modeloIntrumento(sequelize, Sequelize);

sequelize.sync({force: false})
.then(()=>{
    console.log('Tablas sincronizadas')
})

module.exports = {
    Instrumento
}