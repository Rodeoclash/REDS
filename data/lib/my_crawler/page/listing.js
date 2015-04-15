var _ = require('lodash');
var Config = require('../../../config.js');
var Features = require('./listing/features.js');

var Listing = function ($el) {
  this.$el = $el;
};

Listing.prototype._getElementHTML = function(selector) {
  return this.$el.find(selector).html();
};

Listing.prototype.price = function() {
  var priceText = this._getElementHTML(Config.listing[Config.listing.site].selectors.price);
  if (!priceText) {
    return 0;
  }
  var value = priceText.replace(',', '').replace('$', '').match(Config.listing[Config.listing.site].regex.price);
  return _.isNull(value) ? 0 : parseFloat(value[0]);
};

Listing.prototype.address = function() {
  return this._getElementHTML(Config.listing[Config.listing.site].selectors.address);
};

Listing.prototype.uri = function() {
  return Config.domain + this.$el.find(Config.listing[Config.listing.site].selectors.uri).eq(0).attr('href');
};

Listing.prototype.features = function() {
  return new Features(this.$el.find(Config.listing[Config.listing.site].selectors.features));
};

Listing.prototype.toJSON = function() {
  return {
    price: this.price(),
    address: this.address(),
    uri: this.uri(),
    bedrooms: this.features().bedrooms(),
    bathrooms: this.features().bathrooms(),
    carparks: this.features().carparks()
  };
};

module.exports = Listing;
