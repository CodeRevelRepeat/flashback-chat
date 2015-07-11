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

sequelize.import('./Message');

module.exports.sequelize = sequelize; 
