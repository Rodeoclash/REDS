var Config = require('../../config.js')
var _ = require('lodash');
var Listing = require('./page/listing.js');

var Page = function ($) {
  this.$ = $;
};

Page.prototype.title = function () {
  return _.trim(this.$('title').html());
};

// TODO number

Page.prototype.listings = function () {
  var that = this;
  return this.$(Config.listing[Config.listing.type].selector).map(function(i, el) {
    return new Listing(that.$(el));
  });
};

Page.prototype.links = function () {
  return this.$('.cN-pagination a');
};

module.exports = Page;