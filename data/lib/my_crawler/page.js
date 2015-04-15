var Config = require('../../config.js')
var _ = require('lodash');
var Listing = require('./page/listing.js');

var Page = function ($) {
  this.$ = $;
};

Page.prototype.title = function () {
  return _.trim(this.$('title').html());
};

Page.prototype.listings = function () {
  var that = this;
  return this.$(Config.listing[Config.listing.site].selectors.listings).map(function(i, el) {
    return new Listing(that.$(el));
  });
};

Page.prototype.links = function () {
  return this.$(Config.listing[Config.listing.site].selectors.links);
};

module.exports = Page;