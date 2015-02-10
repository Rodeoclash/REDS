var Sequelize = require('sequelize');
var _ = require('lodash');
var Config = require('../../config.js');

var sequelize = new Sequelize(Config.database.development.database,
  Config.database.development.username,
  Config.database.development.password,
  Config.database.development
);

var Property = sequelize.define('property', {
  price: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  title: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  uri: {type: Sequelize.STRING},
  bedrooms: {type: Sequelize.INTEGER},
  bathrooms: {type: Sequelize.INTEGER},
  carparks: {type: Sequelize.INTEGER}
}, {
  freezeTableName: true
});

// Create tables
sequelize.sync({force: true});

module.exports = {
  saveListings: function (listings) {
    try {
      return Property.bulkCreate(_.invoke(listings, 'toJSON'));
    } catch(err) {
      console.log(err);
      process.exit();
    }
  }
};