var _ = require('lodash');
var Config = require('../../../../config.js');

var Features = function ($el) {
  this.$el = $el;
  this.content = $el.html();
};

Features.prototype._matchContent = function(regex) {
  var value = this.content.match(regex);
  return _.isArray(value) ? parseInt(value[0]) : 0;
};

Features.prototype.bedrooms = function() {
  return this._matchContent(Config.listing[Config.listing.type].regex.bed);
};

Features.prototype.bathrooms = function() {
  return this._matchContent(Config.listing[Config.listing.type].regex.bath);
};

Features.prototype.carparks = function() {
  return this._matchContent(Config.listing[Config.listing.type].regex.parking);
};

Features.prototype.toJSON = function() {
  return {
    bedrooms: this.bedrooms(),
    bathrooms: this.bathrooms(),
    carparks: this.carparks()
  }
};

module.exports = Features;