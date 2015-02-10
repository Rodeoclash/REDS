var Sequelize = require('sequelize');
var Config = require('../config.js');

var sequelize = new Sequelize(Config.database.development.database,
  Config.database.development.username,
  Config.database.development.password,
  Config.database.development
);

module.exports = {
  db: sequelize
};