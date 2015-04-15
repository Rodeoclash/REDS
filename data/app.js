var Config = require('./config.js');
var program = require('commander');
var Property = require('./lib/models/property.js');
var Geocoder = require('./lib/geocoder.js');
var Ranker = require('./lib/ranker.js');

program
  .version('0.0.1');

program
  .command('crawl')
  .description('Crawl data')
  .option('-u, --uri [uri]', 'Start crawling from this location')
  .action(function(env) {
    Property.db.sync({force: true}).then(function () {
      var myCrawler = require("./lib/my_crawler.js");
      myCrawler.queue(env.uri);
    });
  });

program
  .command('geocode')
  .description('Geocode addresses')
  .action(function(env) {
    Property.db.sync().then(function () {
      Property.db.findAll({where:{latitude: null}}).then(function (properties) {
        Geocoder.queue(properties);
      });
    });
  });

program
  .command('rank')
  .description('Returns ranked houses based on criteria')
  .option('-x, --min-price <price>', 'Min price to search on')
  .option('-y, --max-price <price>', 'Max price to search on')
  .option('-l, --location <coords>', 'Desired location')
  .option('-d, --distance <meters>', 'Max distance from location')
  .option('-b, --bedrooms <bedrooms>', 'Desired bedrooms')
  .option('-c, --count <count>', 'Number of results')
  .action(function(env, options) {

    Property.db.sync().then(function () {
      Property.db.findAll().then(function (properties) {
        Ranker.rank({
          properties: properties,
          minPrice: parseInt(env.minPrice, 10),
          maxPrice: parseInt(env.maxPrice, 10),
          location: env.location,
          distance: parseInt(env.distance, 10),
          bedrooms: parseInt(env.bedrooms, 10),
          count: parseInt(env.count, 10)
        });
      });
    });

  });

program.parse(process.argv);
