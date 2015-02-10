var _ = require('lodash'),
    async = require('async'),
    geocoderProvider = 'google',
    httpAdapter = 'http',
    geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);

module.exports = {
  queue: function (properties) {

    var toEncode = _.map(properties, function (property) {
      return function (cb) {

        var property = this;

        console.log('Geocoding:', property.address + ', Melbourne');

        geocoder.geocode({
          address: property.address + ', Melbourne',
          country: 'Australia'
        }).then(function (res) {

          property.set('latitude', res[0].latitude);
          property.set('longitude', res[0].longitude);
          property.save();

          setTimeout(function () {
            cb(null, res);
          }, 1000);

        }).catch(function(err) {
          cb(err);
        });

      }.bind(property);
    });

    async.series(toEncode, function (err, result) {
      console.log('Geocoding done', err || result);
    });
  }
};