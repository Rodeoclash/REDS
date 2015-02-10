var _ = require('lodash');
var Sequelize = require('sequelize');
var db = require('../models').db;

var Property = db.define('property', {
  price: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  title: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  uri: {type: Sequelize.STRING},
  bedrooms: {type: Sequelize.INTEGER},
  bathrooms: {type: Sequelize.INTEGER},
  carparks: {type: Sequelize.INTEGER},
  latitude: {type: Sequelize.STRING},
  longitude: {type: Sequelize.STRING}
}, {
  freezeTableName: true
});

module.exports = {
  db: Property
};