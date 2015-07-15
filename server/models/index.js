'use strict';

var Sequelize = require('sequelize');

//initialize database

var database = process.env.DATABASE_NAME || 'chatapp';
var username = process.env.DATABASE_USERNAME || 'chatter1';
var password = process.env.DATABASE_PASSWORD || 'code';
var host = process.env.DATABASE_HOST || 'localhost';


var sequelize = new Sequelize(database, username, password, {
  dialect: 'postgres',
  host: host
})


var models = ['Message'];

models.forEach(function(model){
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(module){
//Define any relationships between models here
})(module.exports);

module.exports.sequelize = sequelize; 
