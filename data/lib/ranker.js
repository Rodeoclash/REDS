var _ = require('lodash');
var openUrl = require("openurl");
var Config = require('../config.js');

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports = {
  rank: function (options) {

    var desiredCoords = {
      lat: parseFloat(options.location.split(',')[0]),
      lng: parseFloat(options.location.split(',')[1])
    };

    var scoredProperties = _(options.properties)
      .map(function (property) {

        var score = [];

        // score price
        if (property.price < options.minPrice || property.price > options.maxPrice) {
          score.push(0);
        } else {
          score.push(10 - ((property.price-options.minPrice) / (options.maxPrice-options.minPrice) * 10))
        }

        // score bedrooms
        if (property.bedrooms < options.bedrooms) {
          score.push(0);
        } else {
          score.push(((property.bedrooms / options.bedrooms) * 10) * Config.importance.bedrooms);
        }

        // score distance
        property.distance = getDistanceFromLatLonInKm(parseFloat(property.latitude), parseFloat(property.longitude), desiredCoords.lat, desiredCoords.lng);

        if (property.distance > options.distance) {
          score.push(0);
        } else {
          score.push((10 - ((property.distance / options.distance) * 10)) * Config.importance.distance);
        }

        // total
        property.score = _.reduce(score, function (sum, n) {
          return sum + n;
        }, 0);

        return property;

      })
      .sortBy('score')
      .reverse()
      .value();

    console.log('==================================');
    console.log('Top ' + options.count);
    console.log('==================================');
    _.each(scoredProperties.slice(0, options.count), function (property, i) {
      console.log((i + 1) + ' (' + property.score + ')', property.uri);
      console.log('---------------------------------');
      setTimeout(function () {
        openUrl.open(property.uri);
      }, _.random(0, 3) * 1000);
    });

  }
};