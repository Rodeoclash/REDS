var _ = require('lodash');
var Config = require('../../../../config.js');

var Features = function ($el) {
  this.$el = $el;
};

Features.prototype._matchContent = function(regex) {
  var value = this.content.match(regex);
  return _.isArray(value) ? parseInt(value[0]) : 0;
};

Features.prototype.bedrooms = function() {
  return parseInt(this.$el.find('.domain-icon-ic_beds').parent().find('.copy em').html(), 0) || 0;
};

Features.prototype.bathrooms = function() {
  return parseInt(this.$el.find('.domain-icon-ic_baths').parent().find('.copy em').html(), 0) || 0;
};

Features.prototype.carparks = function() {
  return parseInt(this.$el.find('.domain-icon-ic_cars').parent().find('.copy em').html(), 0) || 0;
};

Features.prototype.toJSON = function() {
  return {
    bedrooms: this.bedrooms(),
    bathrooms: this.bathrooms(),
    carparks: this.carparks()
  }
};

module.exports = Features;