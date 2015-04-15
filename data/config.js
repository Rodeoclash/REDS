module.exports = {
  domain: 'http://www.realestate.com.au',
  suburbs: ['Brunswick', 'Northcote', 'Fitzroy', 'Coburg'],
  importance: {
    distance: 7,
    price: 2,
    bedrooms: 0.5
  },
  database: {
    development: {
      username: null,
      password: null,
      database: "main",
      host: "localhost",
      dialect: "sqlite",
      storage: __dirname + "crawler.sqlite3",
      logging: false
    }
  },
  listing: {
    site: 'realestate.com.au',
    'realestate.com.au': {
      regex: {
        price: /^\d+/
      },
      selectors: {
        links: '.pagination li a',
        listings: '#searchResultsTbl .resultBody',
        price: '.priceText',
        address: '.vcard h2 a',
        uri: '.vcard h2 a',
        features: '.propertyFeatures',
        bedrooms: 'li:eq(0) span',
        bathrooms: 'li:eq(1) span',
        carparks: 'li:eq(2) span'
      }
    }

  }
  
};