var _ = require('lodash');
var Config = require('../../../config.js');
var FeaturesOld = require('./listing/features_old.js');
var FeaturesNew = require('./listing/features_new.js');

var Listing = function ($el) {
  this.$el = $el;
};

Listing.prototype._getElementHTML = function(selector) {
  return this.$el.find(selector).html();
};

Listing.prototype.price = function() {
  var value = this._getElementHTML(Config.listing[Config.listing.type].selectors.price).replace(',', '').replace('$', '').match(Config.listing[Config.listing.type].regex.price);
  return _.isNull(value) ? 0 : parseFloat(value[0]);
};

Listing.prototype.address = function() {
  return this._getElementHTML(Config.listing[Config.listing.type].selectors.address);
};

Listing.prototype.title = function() {
  return this._getElementHTML(Config.listing[Config.listing.type].selectors.title);
};

Listing.prototype.description = function() {
  return this._getElementHTML(Config.listing[Config.listing.type].selectors.description);
};

Listing.prototype.uri = function() {
  return Config.domain + this.$el.find(Config.listing[Config.listing.type].selectors.uri).eq(0).attr('href');
};

Listing.prototype.features = function() {
  if (Config.listing.type === 'new') {
    return new FeaturesNew(this.$el.find(Config.listing[Config.listing.type].selectors.features));
  } else {
    return new FeaturesOld(this.$el.find(Config.listing[Config.listing.type].selectors.features));
  }
};

Listing.prototype.toJSON = function() {
  return {
    price: this.price(),
    address: this.address(),
    title: this.title(),
    description: this.description(),
    uri: this.uri(),
    bedrooms: this.features().bedrooms(),
    bathrooms: this.features().bathrooms(),
    carparks: this.features().carparks()
  };
};

module.exports = Listing;
