var _ = require('lodash');
var Config = require('../../../../config.js');

var Features = function ($el) {
  this.$el = $el;
};

Features.prototype.bedrooms = function() {
  return this.$el.find('li').eq(0).find('span').html();
};

Features.prototype.bathrooms = function() {
  return this.$el.find('li').eq(1).find('span').html();
};

Features.prototype.carparks = function() {
  return this.$el.find('li').eq(2).find('span').html();
};

Features.prototype.toJSON = function() {
  return {
    bedrooms: this.bedrooms(),
    bathrooms: this.bathrooms(),
    carparks: this.carparks()
  }
};

module.exports = Features;