var _ = require('lodash');
var Crawler = require('crawler');
var Config = require('../config.js');
var Page = require('./my_crawler/page.js');
var Property = require('./models/property.js');
var c = new Crawler({

  maxConnections : 1,
  forceUTF8: true,
  skipDuplicates: true,

  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36',
  
  callback : function (error, result, $) {       
    var page = new Page($);

    console.log('Processing: ' + page.title());

    var filteredListings = _(page.listings())
      .reject(function (listing) {
        return listing.price() === 0; // missing a price
      })
      .filter(function (listing) {
        return _.any(Config.suburbs, function (suburb) {
          return listing.address().indexOf(suburb) > -1; // matches one of suburbs liked
        });
      })
      .value();

    Property.db.bulkCreate(_.invoke(filteredListings, 'toJSON'));
    
    page.links().each(function(i, el) {
      c.queue(Config.domain + $(el).attr('href'));
    });

  },

  onDrain: function () {
    console.log('All done');
  }

});

module.exports = c;