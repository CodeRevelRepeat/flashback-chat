'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Message', {
    text: DataTypes.STRING,
    authorName: DataTypes.STRING
  }); 
}